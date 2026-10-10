'use client';

import React from 'react';
import { MemoFormData } from '@/types/letter';

interface MemoFormProps {
  data: MemoFormData;
  onChange: (data: MemoFormData) => void;
}

const inputClass =
  'w-full bg-slate-800/60 border border-slate-700/60 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/70 focus:bg-slate-800 focus:ring-1 focus:ring-blue-500/30 transition-all duration-150';
const labelClass = 'block text-xs font-medium text-slate-400 mb-1';
const fieldGroup = 'space-y-1';

export default function MemoForm({ data, onChange }: MemoFormProps) {
  const set = (key: keyof MemoFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => onChange({ ...data, [key]: e.target.value });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      onChange({ ...data, logo: '' });
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
      
      <div className={fieldGroup}>
        <label className={labelClass}>Logo Instansi (Opsional)</label>
        <input type="file" accept="image/*" className={`${inputClass} text-xs p-1`} onChange={handleImageUpload} />
      </div>
      <div className={fieldGroup}>
        <label className={labelClass}>Nama Instansi / Perusahaan</label>
        <input type="text" className={inputClass} value={data.companyName} onChange={set('companyName')} placeholder="PT PERTAMINA (PERSERO)" />
      </div>
      <div className={fieldGroup}>
        <label className={labelClass}>Nama Departemen / Fungsi</label>
        <input type="text" className={inputClass} value={data.departmentName} onChange={set('departmentName')} placeholder="FUNGSI INFORMATION TECHNOLOGY" />
      </div>
      <div className={fieldGroup}>
        <label className={labelClass}>Alamat & Kontak</label>
        <textarea className={`${inputClass} resize-none`} rows={2} value={data.companyAddress} onChange={set('companyAddress')} placeholder="Jl. Medan Merdeka..." />
      </div>

      <div className="pb-3 border-b border-slate-700/50 pt-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Informasi Surat
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={fieldGroup}>
          <label className={labelClass}>Nomor Surat</label>
          <input
            type="text"
            className={inputClass}
            value={data.letterNumber}
            onChange={set('letterNumber')}
            placeholder="Auto-generated"
          />
        </div>
        <div className={fieldGroup}>
          <label className={labelClass}>Tanggal</label>
          <input
            type="date"
            className={inputClass}
            value={data.date}
            onChange={set('date')}
          />
        </div>
      </div>

      <div className={fieldGroup}>
        <label className={labelClass}>Klasifikasi</label>
        <select className={inputClass} value={data.classification} onChange={set('classification')}>
          <option value="BIASA">BIASA</option>
          <option value="SEGERA">SEGERA</option>
          <option value="RAHASIA">RAHASIA</option>
        </select>
      </div>

      <div className={fieldGroup}>
        <label className={labelClass}>Kepada (Yth.)</label>
        <input
          type="text"
          className={inputClass}
          value={data.to}
          onChange={set('to')}
          placeholder="Nama / Jabatan penerima"
        />
      </div>

      <div className={fieldGroup}>
        <label className={labelClass}>Dari</label>
        <input
          type="text"
          className={inputClass}
          value={data.from}
          onChange={set('from')}
          placeholder="Nama / Jabatan pengirim"
        />
      </div>



      <div className={fieldGroup}>
        <label className={labelClass}>Perihal / Subjek</label>
        <input
          type="text"
          className={inputClass}
          value={data.subject}
          onChange={set('subject')}
          placeholder="Judul atau pokok bahasan memo"
        />
      </div>

      <div className="pb-3 border-b border-slate-700/50 pt-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Isi Memo
        </h3>
      </div>

      <div className={fieldGroup}>
        <label className={labelClass}>Isi Surat</label>
        <textarea
          className={`${inputClass} resize-none leading-relaxed`}
          rows={8}
          value={data.body}
          onChange={set('body')}
          placeholder="Tulis isi memo di sini. Gunakan Enter untuk memisahkan paragraf..."
        />
      </div>

      <div className="pb-3 border-b border-slate-700/50 pt-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Penandatangan
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={fieldGroup}>
          <label className={labelClass}>Nama Penandatangan</label>
          <input
            type="text"
            className={inputClass}
            value={data.signerName}
            onChange={set('signerName')}
            placeholder="Nama lengkap"
          />
        </div>
        <div className={fieldGroup}>
          <label className={labelClass}>Jabatan</label>
          <input
            type="text"
            className={inputClass}
            value={data.signerTitle}
            onChange={set('signerTitle')}
            placeholder="Jabatan / posisi"
          />
        </div>
      </div>
    </div>
  );
}
