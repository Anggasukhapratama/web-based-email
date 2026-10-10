'use client';

import React from 'react';
import { LetterType } from '@/types/letter';
import { FileText, ClipboardCheck, ChevronDown } from 'lucide-react';

interface TemplateSelectorProps {
  selected: LetterType;
  onChange: (type: LetterType) => void;
}

const templates: { value: LetterType; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    value: 'memo',
    label: 'Memo Internal',
    desc: 'Surat komunikasi internal antar departemen',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    value: 'sika',
    label: 'Surat Izin Kerja Aman (SIKA)',
    desc: 'Izin kerja untuk aktivitas berisiko tinggi',
    icon: <ClipboardCheck className="w-5 h-5" />,
  },
  {
    value: 'formal',
    label: 'Surat Formal (Umum)',
    desc: 'Surat formal dengan 2 logo kustom dan penandatangan',
    icon: <FileText className="w-5 h-5" />,
  },
];

export default function TemplateSelector({ selected, onChange }: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">
        Jenis Dokumen
      </label>
      <div className="grid grid-cols-1 gap-2">
        {templates.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left group ${
              selected === t.value
                ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10'
                : 'border-slate-700/50 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-700/30'
            }`}
          >
            <span
              className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                selected === t.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'
              }`}
            >
              {t.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${selected === t.value ? 'text-blue-300' : 'text-slate-200'}`}>
                {t.label}
              </p>
              <p className="text-xs text-slate-500 truncate">{t.desc}</p>
            </div>
            {selected === t.value && (
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
