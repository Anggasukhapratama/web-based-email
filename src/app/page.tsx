'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LetterType, MemoFormData, SIKAFormData, FormalFormData } from '@/types/letter';
import { generateLetterNumber } from '@/lib/numbering';
import TemplateSelector from '@/components/TemplateSelector';
import MemoForm from '@/components/MemoForm';
import SIKAForm from '@/components/SIKAForm';
import FormalForm from '@/components/FormalForm';
import MemoPreview from '@/components/MemoPreview';
import SIKAPreview from '@/components/SIKAPreview';
import FormalPreview from '@/components/FormalPreview';
import ExportBar from '@/components/ExportBar';
import { Zap, RefreshCw, Hash } from 'lucide-react';

const today = new Date().toISOString().split('T')[0];

const defaultMemo = (): MemoFormData => ({
  letterNumber: '',
  date: today,
  to: '',
  from: '',
  subject: '',
  body: '',
  signerName: '',
  signerTitle: '',
  department: 'IT - Information Technology',
  classification: 'BIASA',
  logo: '',
  companyName: 'PT PERTAMINA (PERSERO)',
  departmentName: 'FUNGSI INFORMATION TECHNOLOGY',
  companyAddress: 'Jl. Medan Merdeka Timur No. 1A, Jakarta Pusat 10110 | Telp: (021) 3815111',
});

const defaultSIKA = (): SIKAFormData => ({
  letterNumber: '',
  date: today,
  validFrom: today,
  validUntil: '',
  requestorName: '',
  requestorNIK: '',
  requestorDept: 'IT - Information Technology',
  vendorName: '',
  vendorPIC: '',
  workLocation: '',
  workDescription: '',
  equipmentUsed: '',
  safetyRequirements: '',
  approverName: '',
  approverTitle: '',
  witnessName: '',
  witnessTitle: '',
  logo: '',
  companyName: 'PT PERTAMINA (PERSERO)',
  departmentName: 'FUNGSI INFORMATION TECHNOLOGY',
  companyAddress: 'Jl. Medan Merdeka Timur No. 1A, Jakarta Pusat 10110 | Telp: (021) 3815111',
});

const defaultFormal = (): FormalFormData => ({
  logoLeft: '',
  logoRight: '',
  headerName: 'KOMISI HUBUNGAN ANTAR AGAMA DAN KEMASYARAKATAN\n(HAAK)\nKEUSKUPAN AGUNG JAKARTA',
  headerAddress: 'Gedung Karya Pastoral - KAJ Lt. 3\nJl. Katedral No. 7 Jakarta Pusat 10710',
  headerContact: 'Telp: 021-3519193 — Fax: 021-3855752',
  letterNumber: '',
  date: today,
  attachment: '-',
  subject: '',
  to: 'Para Romo, Bapak/Ibu/Sdr/Sdri semua',
  greeting: 'Dengan hormat,',
  body: '',
  closing: 'Demikianlah penjelasan dari kami, Atas perhatian dan kerjasama Bapak Ibu, kami ucapkan terima kasih.',
  location: 'Jakarta',
  signer1Title: 'Ketua',
  signer1Name: '',
  signer2Title: 'Sekretaris',
  signer2Name: '',
});

export default function HomePage() {
  const [letterType, setLetterType] = useState<LetterType>('memo');
  const [memoData, setMemoData] = useState<MemoFormData>(defaultMemo);
  const [sikaData, setSIKAData] = useState<SIKAFormData>(defaultSIKA);
  const [formalData, setFormalData] = useState<FormalFormData>(defaultFormal);
  const [previewScale, setPreviewScale] = useState(1);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-generate letter number on mount & type change
  useEffect(() => {
    if (!mounted) return;
    const num = generateLetterNumber(letterType);
    if (letterType === 'memo') {
      setMemoData((d) => ({ ...d, letterNumber: num }));
    } else if (letterType === 'sika') {
      setSIKAData((d) => ({ ...d, letterNumber: num }));
    } else {
      setFormalData((d) => ({ ...d, letterNumber: num }));
    }
  }, [letterType, mounted]);

  // Dynamic scale for preview panel
  useEffect(() => {
    const updateScale = () => {
      if (!previewContainerRef.current) return;
      const containerWidth = previewContainerRef.current.offsetWidth - 48; // padding
      const a4WidthPx = 794; // 210mm @ 96dpi
      const scale = Math.min(1, containerWidth / a4WidthPx);
      setPreviewScale(scale);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleTypeChange = (type: LetterType) => {
    setLetterType(type);
  };

  const handleReset = () => {
    if (letterType === 'memo') {
      const num = generateLetterNumber('memo');
      setMemoData({ ...defaultMemo(), letterNumber: num });
    } else if (letterType === 'sika') {
      const num = generateLetterNumber('sika');
      setSIKAData({ ...defaultSIKA(), letterNumber: num });
    } else {
      const num = generateLetterNumber('formal');
      setFormalData({ ...defaultFormal(), letterNumber: num });
    }
  };

  const handleRegenerateNumber = () => {
    const num = generateLetterNumber(letterType);
    if (letterType === 'memo') {
      setMemoData((d) => ({ ...d, letterNumber: num }));
    } else if (letterType === 'sika') {
      setSIKAData((d) => ({ ...d, letterNumber: num }));
    } else {
      setFormalData((d) => ({ ...d, letterNumber: num }));
    }
  };

  const currentLetterNumber =
    letterType === 'memo' ? memoData.letterNumber : (letterType === 'sika' ? sikaData.letterNumber : formalData.letterNumber);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-animated flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Memuat QuickLetter...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-animated flex flex-col">
      {/* ===== TOPBAR ===== */}
      <header className="glass-panel border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none tracking-tight">
                QuickLetter
              </h1>
              <p className="text-slate-500 text-xs leading-none mt-0.5">
                Generator Surat Otomatis
              </p>
            </div>
          </div>

          {/* Letter number badge */}
          <div className="flex-1 max-w-md hidden md:flex items-center justify-center">
            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-full px-4 py-1.5">
              <Hash className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs text-slate-300 font-mono tracking-wide">
                {currentLetterNumber || 'Nomor akan di-generate otomatis'}
              </span>
              <button
                onClick={handleRegenerateNumber}
                className="ml-1 text-slate-500 hover:text-blue-400 transition-colors"
                title="Regenerate nomor surat"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 text-sm hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-150"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Form</span>
            </button>
            <ExportBar letterType={letterType} letterNumber={currentLetterNumber} />
          </div>
        </div>
      </header>

      {/* ===== MAIN SPLIT SCREEN ===== */}
      <main className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
        {/* ===== LEFT PANEL: FORM ===== */}
        <aside className="w-[400px] flex-shrink-0 flex flex-col glass-panel border-r border-white/5 overflow-hidden">
          {/* Panel header */}
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-sm font-semibold text-slate-200">Form Isian</h2>
            <p className="text-xs text-slate-500 mt-0.5">Isi data di bawah untuk mengisi surat</p>
          </div>

          {/* Scrollable form content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Template selector */}
            <TemplateSelector selected={letterType} onChange={handleTypeChange} />

            {/* Divider */}
            <div className="border-t border-slate-700/50" />

            {/* Dynamic form */}
            {letterType === 'memo' && (
              <MemoForm data={memoData} onChange={setMemoData} />
            )}
            {letterType === 'sika' && (
              <SIKAForm data={sikaData} onChange={setSIKAData} />
            )}
            {letterType === 'formal' && (
              <FormalForm data={formalData} onChange={setFormalData} />
            )}

            {/* Bottom padding */}
            <div className="h-8" />
          </div>
        </aside>

        {/* ===== RIGHT PANEL: PREVIEW ===== */}
        <div
          ref={previewContainerRef}
          className="flex-1 overflow-y-auto bg-slate-900/40"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '24px 24px' }}
        >
          {/* Preview toolbar */}
          <div className="sticky top-0 z-10 glass-panel border-b border-white/5 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Live Preview
              </span>
              <span className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                Real-time
              </span>
            </div>
            <span className="text-xs text-slate-600 font-mono">A4 · 210 × 297 mm</span>
          </div>

          {/* Paper preview */}
          <div className="p-6 flex justify-center">
            <div
              className="preview-scaler"
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: 'top center',
                width: '794px',
                marginBottom: previewScale < 1 ? `${-(794 * (1 - previewScale) * 1.41)}px` : 0,
              }}
            >
              <div
                id="print-target"
                className="rounded-sm paper-shadow overflow-hidden"
              >
                {letterType === 'memo' && (
                  <MemoPreview data={memoData} />
                )}
                {letterType === 'sika' && (
                  <SIKAPreview data={sikaData} />
                )}
                {letterType === 'formal' && (
                  <FormalPreview data={formalData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===== STATUS BAR ===== */}
      <footer className="glass-panel border-t border-white/5 px-6 py-2 flex items-center justify-between">
        <p className="text-xs text-slate-600">
          QuickLetter v1.0.0 — PT Pertamina (Persero) · Fungsi Information Technology
        </p>
        <p className="text-xs text-slate-600">
          Data diproses secara lokal di browser · Tidak dikirim ke server
        </p>
      </footer>
    </div>
  );
}
