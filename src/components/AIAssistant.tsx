'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, ChevronDown, ChevronUp, X, Copy, Check } from 'lucide-react';
import { LetterType } from '@/types/letter';

interface AIAssistantProps {
  letterType: LetterType;
  context?: {
    subject?: string;
    to?: string;
    from?: string;
    workDescription?: string;
  };
  onApply: (text: string) => void;
  fieldLabel?: string;
}

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent';

const promptTemplates: Record<LetterType, (ctx: AIAssistantProps['context'], customPrompt: string) => string> = {
  memo: (ctx, custom) => `Kamu adalah asisten profesional untuk membuat memo internal perusahaan dalam Bahasa Indonesia yang formal dan profesional.

Konteks:
- Kepada: ${ctx?.to || '(belum diisi)'}
- Dari: ${ctx?.from || '(belum diisi)'}
- Perihal: ${ctx?.subject || '(belum diisi)'}
- Permintaan pengguna: ${custom || 'Buatkan isi memo yang profesional'}

Tulis isi memo internal yang singkat, padat, dan profesional. Format dengan paragraf. Tanpa pembuka "Berikut memo..." atau tanda bintang. Langsung isi memo saja. Maksimal 3 paragraf.`,

  sika: (ctx, custom) => `Kamu adalah asisten profesional untuk membuat dokumen Surat Izin Kerja Aman (SIKA) dalam Bahasa Indonesia.

Konteks:
- Deskripsi pekerjaan: ${ctx?.workDescription || '(belum diisi)'}
- Permintaan pengguna: ${custom || 'Buatkan deskripsi pekerjaan SIKA yang lengkap dan jelas'}

Tulis deskripsi pekerjaan yang jelas, detail, dan memenuhi standar K3 (Keselamatan dan Kesehatan Kerja). Sebutkan langkah-langkah kerja secara ringkas. Tanpa pembuka atau penutup berlebihan. Maksimal 4 kalimat.`,

  formal: (ctx, custom) => `Kamu adalah asisten profesional untuk membuat surat formal dalam Bahasa Indonesia yang sesuai dengan standar surat resmi.

Konteks:
- Kepada: ${ctx?.to || '(belum diisi)'}
- Perihal: ${ctx?.subject || '(belum diisi)'}
- Permintaan pengguna: ${custom || 'Buatkan isi surat formal yang profesional'}

Tulis isi surat formal yang sopan, jelas, dan profesional. Gunakan bahasa yang baku dan formal. Tanpa salam pembuka/penutup (sudah ada di template). Langsung isi saja. Maksimal 3 paragraf.`,
};

export default function AIAssistant({ letterType, context, onApply, fieldLabel = 'Isi Surat' }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gemini_api_key') || '';
    }
    return '';
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_api_key', key);
    }
  };

  const generateSuggestion = async () => {
    if (!apiKey.trim()) {
      setError('Masukkan Gemini API Key terlebih dahulu. Dapatkan gratis di aistudio.google.com');
      return;
    }
    setLoading(true);
    setError('');
    setSuggestion('');

    try {
      // Try models in order: 3.8-flash → 2.0-flash → 1.5-flash
      const MODELS = [
        'gemini-3.8-flash',
        'gemini-2.0-flash',
        'gemini-1.5-flash',
      ];

      let lastError = '';
      for (const model of MODELS) {
        try {
          const prompt = promptTemplates[letterType](context, customPrompt);
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 512,
              },
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            const msg: string = data?.error?.message || `HTTP ${res.status}`;
            // Skip to next model if this one is unavailable
            if (
              msg.toLowerCase().includes('no longer available') ||
              msg.toLowerCase().includes('not found') ||
              msg.toLowerCase().includes('not supported')
            ) {
              lastError = msg;
              continue;
            }
            // "Denied access" = API Key issue, not model issue → stop immediately
            if (msg.toLowerCase().includes('denied') || msg.toLowerCase().includes('permission')) {
              setError(
                '❌ API Key tidak punya akses.\n\n' +
                'Cara fix: Buka aistudio.google.com/app/apikey → Buat API Key BARU → pilih/buat project Google → paste di kolom atas.'
              );
              return;
            }
            lastError = msg;
            continue;
          }

          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (text.trim()) {
            setSuggestion(text.trim());
            return;
          }
        } catch {
          // Network / parse error — try next model
          lastError = 'Gagal terhubung ke Gemini API';
          continue;
        }
      }

      // All models failed
      setError(lastError || 'Semua model tidak tersedia. Buat API Key baru di aistudio.google.com');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (suggestion) {
      onApply(suggestion);
      setSuggestion('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="ai-assistant-panel">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ai-toggle-btn"
        type="button"
      >
        <span className="ai-toggle-inner">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bantu dengan AI</span>
        </span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="ai-panel">
          {/* API Key input */}
          <div className="ai-field">
            <label className="ai-label">
              Gemini API Key
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="ai-link"
              >
                Dapatkan gratis →
              </a>
            </label>
            <div className="ai-key-row">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => saveApiKey(e.target.value)}
                placeholder="AIza..."
                className="ai-input"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="ai-eye-btn"
              >
                {showApiKey ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {/* Custom Prompt */}
          <div className="ai-field">
            <label className="ai-label">Permintaan kamu (opsional)</label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={`Contoh: "Buat memo tentang update sistem IT" atau kosongkan untuk saran otomatis`}
              rows={2}
              className="ai-textarea"
            />
          </div>

          {/* Generate button */}
          <button
            onClick={generateSuggestion}
            disabled={loading}
            className="ai-generate-btn"
            type="button"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sedang membuat saran...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Saran {fieldLabel}</span>
              </>
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="ai-error">
              <X className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Suggestion result */}
          {suggestion && (
            <div className="ai-result">
              <div className="ai-result-header">
                <span className="ai-result-label">
                  <Sparkles className="w-3 h-3" />
                  Saran AI
                </span>
                <div className="ai-result-actions">
                  <button onClick={handleCopy} className="ai-action-btn" type="button">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => setSuggestion('')} className="ai-action-btn" type="button">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="ai-result-text">{suggestion}</p>
              <button onClick={handleApply} className="ai-apply-btn" type="button">
                Terapkan ke Form
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
