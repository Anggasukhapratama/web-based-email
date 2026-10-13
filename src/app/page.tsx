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
import { Zap, RefreshCw, Hash, FileText, Eye } from 'lucide-react';

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

type MobileTab = 'form' | 'preview';

export default function HomePage() {
  const [letterType, setLetterType] = useState<LetterType>('memo');
  const [memoData, setMemoData] = useState<MemoFormData>(defaultMemo);
  const [sikaData, setSIKAData] = useState<SIKAFormData>(defaultSIKA);
  const [formalData, setFormalData] = useState<FormalFormData>(defaultFormal);
  const [previewScale, setPreviewScale] = useState(1);
  const [mobileTab, setMobileTab] = useState<MobileTab>('form');
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

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
      const containerWidth = previewContainerRef.current.offsetWidth - 48;
      const a4WidthPx = 794;
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
    letterType === 'memo'
      ? memoData.letterNumber
      : letterType === 'sika'
      ? sikaData.letterNumber
      : formalData.letterNumber;

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '36px', height: '36px', border: '3px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
          <p style={{ color: '#93c5fd', fontSize: '0.8rem' }}>Memuat QuickLetter...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {/* ===== TOPBAR ===== */}
      <header className="topbar">
        <div className="topbar-inner">
          {/* Brand */}
          <div className="brand">
            <div className="brand-icon">
              <Zap style={{ width: '16px', height: '16px', color: 'white' }} />
            </div>
            <div>
              <div className="brand-name">QuickLetter</div>
              <div className="brand-tagline">Generator Surat Otomatis</div>
            </div>
          </div>

          {/* Letter number badge (desktop only) */}
          <div className="letter-num-badge" style={{ flex: 1, maxWidth: '380px' }}>
            <Hash style={{ width: '12px', height: '12px', color: '#2563eb', flexShrink: 0 }} />
            <span className="letter-num-text">
              {currentLetterNumber || 'Nomor akan di-generate otomatis'}
            </span>
            <button onClick={handleRegenerateNumber} className="regen-btn" title="Regenerate nomor surat">
              <RefreshCw style={{ width: '11px', height: '11px' }} />
            </button>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <button onClick={handleReset} className="reset-btn" title="Reset Form">
              <RefreshCw style={{ width: '13px', height: '13px' }} />
              <span className="reset-btn-text">Reset</span>
            </button>
            <ExportBar letterType={letterType} letterNumber={currentLetterNumber} />
          </div>
        </div>
      </header>

      {/* ===== MOBILE TABS ===== */}
      <div className="mobile-tabs">
        <button
          className={`mobile-tab-btn ${mobileTab === 'form' ? 'active' : ''}`}
          onClick={() => setMobileTab('form')}
        >
          <FileText style={{ width: '14px', height: '14px' }} />
          Form Isian
        </button>
        <button
          className={`mobile-tab-btn ${mobileTab === 'preview' ? 'active' : ''}`}
          onClick={() => setMobileTab('preview')}
        >
          <Eye style={{ width: '14px', height: '14px' }} />
          Preview
        </button>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-area" style={{ height: 'calc(100vh - 56px)' }}>
        {/* ===== SIDEBAR: FORM ===== */}
        <aside className={`sidebar ${mobileTab === 'preview' ? 'mobile-hidden' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-title">Form Isian</div>
            <div className="sidebar-subtitle">Isi data untuk membuat surat</div>
          </div>
          <div className="sidebar-scroll sidebar-scroll">
            <TemplateSelector selected={letterType} onChange={handleTypeChange} />

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '1rem 0' }} />

            {letterType === 'memo' && (
              <MemoForm data={memoData} onChange={setMemoData} />
            )}
            {letterType === 'sika' && (
              <SIKAForm data={sikaData} onChange={setSIKAData} />
            )}
            {letterType === 'formal' && (
              <FormalForm data={formalData} onChange={setFormalData} />
            )}

            <div style={{ height: '2rem' }} />
          </div>
        </aside>

        {/* ===== PREVIEW PANEL ===== */}
        <div
          ref={previewContainerRef}
          className={`preview-area ${mobileTab === 'form' ? 'mobile-hidden' : ''}`}
        >
          {/* Preview toolbar */}
          <div className="preview-toolbar">
            <div className="preview-live-badge">
              <div
                className="preview-live-dot"
                style={{ animation: 'pulse 2s infinite' }}
              />
              Live Preview
            </div>
            <span className="preview-a4-label">A4 · 210 × 297 mm</span>
          </div>

          {/* Paper preview */}
          <div className="preview-canvas">
            <div
              className="preview-scaler"
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: 'top center',
                width: '794px',
                marginBottom: previewScale < 1 ? `${-(794 * (1 - previewScale) * 1.41)}px` : 0,
              }}
            >
              <div id="print-target" className="paper-shadow" style={{ borderRadius: '2px', overflow: 'hidden' }}>
                {letterType === 'memo' && <MemoPreview data={memoData} />}
                {letterType === 'sika' && <SIKAPreview data={sikaData} />}
                {letterType === 'formal' && <FormalPreview data={formalData} />}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===== STATUS BAR ===== */}
      <footer className="status-bar">
        <p className="status-text">QuickLetter v2.0.0 — PT Pertamina (Persero) · Fungsi IT</p>
        <p className="status-text">Data diproses lokal di browser · Tidak dikirim ke server</p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
