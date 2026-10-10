'use client';

import React from 'react';
import { LetterType } from '@/types/letter';
import { FileText, ClipboardCheck } from 'lucide-react';

interface TemplateSelectorProps {
  selected: LetterType;
  onChange: (type: LetterType) => void;
}

const templates: { value: LetterType; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    value: 'memo',
    label: 'Memo Internal',
    desc: 'Komunikasi internal antar departemen',
    icon: <FileText style={{ width: '15px', height: '15px' }} />,
  },
  {
    value: 'sika',
    label: 'SIKA',
    desc: 'Surat Izin Kerja Aman',
    icon: <ClipboardCheck style={{ width: '15px', height: '15px' }} />,
  },
  {
    value: 'formal',
    label: 'Surat Formal',
    desc: 'Surat formal umum dengan kop kustom',
    icon: <FileText style={{ width: '15px', height: '15px' }} />,
  },
];

export default function TemplateSelector({ selected, onChange }: TemplateSelectorProps) {
  return (
    <div style={{ marginBottom: '0.25rem' }}>
      <div className="form-section-title">Jenis Dokumen</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {templates.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={`template-btn ${selected === t.value ? 'active' : ''}`}
            type="button"
          >
            <span className="template-icon">{t.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="template-label">{t.label}</p>
              <p className="template-desc">{t.desc}</p>
            </div>
            {selected === t.value && (
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  flexShrink: 0,
                  animation: 'pulse 2s infinite',
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
