'use client';

import React from 'react';
import { FormalFormData } from '@/types/letter';

interface FormalFormProps {
  data: FormalFormData;
  onChange: (data: FormalFormData) => void;
}

const inputClass =
  'w-full bg-slate-800/60 border border-slate-700/60 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/70 focus:bg-slate-800 focus:ring-1 focus:ring-blue-500/30 transition-all duration-150';
const labelClass = 'block text-xs font-medium text-slate-400 mb-1';
const fieldGroup = 'space-y-1';

export default function FormalForm({ data, onChange }: FormalFormProps) {
  const set = (key: keyof FormalFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => onChange({ ...data, [key]: e.target.value });

  const handleImageUpload = (key: 'logoLeft' | 'logoRight') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, [key]: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      onChange({ ...data, [key]: '' });
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Info */}
      <div className="pb-3 border-b border-slate-700/50">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Kop Surat (Header)
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className={fieldGroup}>
          <label className={labelClass}>Logo Kiri (Opsional)</label>
          <input type="file" accept="image/*" className={`${inputClass} text-xs p-1`} onChange={handleImageUpload('logoLeft')} />
        </div>
        <div className={fieldGroup}>
          <label className={labelClass}>Logo Kanan (Opsional)</label>
          <input type="file" accept="image/*" className={`${inputClass} text-xs p-1`} onChange={handleImageUpload('logoRight')} />
        </div>
      </div>
      
      <div className={fieldGroup}>
        <label className={labelClass}>Nama Instansi / Komisi</label>
        <textarea
          className={`${inputClass} resize-none leading-relaxed text-center`}
          rows={2}
          value={data.headerName}
          onChange={set('headerName')}
          placeholder="KOMISI HUBUNGAN ANTAR AGAMA..."
        />
      </div>
      
      <div className={fieldGroup}>
        <label className={labelClass}>Alamat</label>
        <input type="text" className={`${inputClass} text-center`} value={data.headerAddress} onChange={set('headerAddress')} placeholder="Gedung Karya Pastoral..." />
      </div>
      <div className={fieldGroup}>
        <label className={labelClass}>Kontak</label>
        <input type="text" className={`${inputClass} text-center`} value={data.headerContact} onChange={set('headerContact')} placeholder="Telp: 021-..." />
      </div>

      <div className="pb-3 border-b border-slate-700/50 pt-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Informasi Surat</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className={fieldGroup}>
          <label className={labelClass}>Nomor Surat</label>
          <input type="text" className={inputClass} value={data.letterNumber} onChange={set('letterNumber')} />
        </div>
        <div className={fieldGroup}>
          <label className={labelClass}>Tanggal</label>
          <input type="date" className={inputClass} value={data.date} onChange={set('date')} />
        </div>
      </div>
      
      <div className={fieldGroup}>
        <label className={labelClass}>Lampiran</label>
        <input type="text" className={inputClass} value={data.attachment} onChange={set('attachment')} placeholder="- / 1 Berkas" />
      </div>
      <div className={fieldGroup}>
        <label className={labelClass}>Perihal</label>
        <input type="text" className={inputClass} value={data.subject} onChange={set('subject')} placeholder="Undangan Rapat..." />
      </div>
      <div className={fieldGroup}>
        <label className={labelClass}>Kepada Yth.</label>
        <textarea className={`${inputClass} resize-none leading-relaxed`} rows={2} value={data.to} onChange={set('to')} placeholder="Para Romo, Bapak/Ibu..." />
      </div>

      <div className="pb-3 border-b border-slate-700/50 pt-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Isi Surat</h3>
      </div>
      
      <div className={fieldGroup}>
        <label className={labelClass}>Salam Pembuka</label>
        <input type="text" className={inputClass} value={data.greeting} onChange={set('greeting')} placeholder="Dengan hormat," />
      </div>
      <div className={fieldGroup}>
        <label className={labelClass}>Isi</label>
        <textarea className={`${inputClass} resize-none leading-relaxed`} rows={6} value={data.body} onChange={set('body')} placeholder="Bersama ini kami..." />
      </div>
      <div className={fieldGroup}>
        <label className={labelClass}>Salam Penutup</label>
        <textarea className={`${inputClass} resize-none leading-relaxed`} rows={2} value={data.closing} onChange={set('closing')} placeholder="Demikianlah penjelasan dari kami..." />
      </div>

      <div className="pb-3 border-b border-slate-700/50 pt-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Penandatangan</h3>
      </div>
      
      <div className={fieldGroup}>
        <label className={labelClass}>Lokasi (untuk tanggal ttd)</label>
        <input type="text" className={inputClass} value={data.location} onChange={set('location')} placeholder="Jakarta" />
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className={fieldGroup}>
          <label className={labelClass}>Jabatan 1 (Kiri)</label>
          <input type="text" className={inputClass} value={data.signer1Title} onChange={set('signer1Title')} placeholder="Ketua" />
        </div>
        <div className={fieldGroup}>
          <label className={labelClass}>Nama 1 (Kiri)</label>
          <input type="text" className={inputClass} value={data.signer1Name} onChange={set('signer1Name')} placeholder="Nama Ketua" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className={fieldGroup}>
          <label className={labelClass}>Jabatan 2 (Kanan)</label>
          <input type="text" className={inputClass} value={data.signer2Title} onChange={set('signer2Title')} placeholder="Sekretaris" />
        </div>
        <div className={fieldGroup}>
          <label className={labelClass}>Nama 2 (Kanan)</label>
          <input type="text" className={inputClass} value={data.signer2Name} onChange={set('signer2Name')} placeholder="Nama Sekretaris" />
        </div>
      </div>
    </div>
  );
}
