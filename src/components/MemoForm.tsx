'use client';

import React from 'react';
import { MemoFormData } from '@/types/letter';
import AIAssistant from './AIAssistant';

interface MemoFormProps {
  data: MemoFormData;
  onChange: (data: MemoFormData) => void;
}

export default function MemoForm({ data, onChange }: MemoFormProps) {
  const set = (key: keyof MemoFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => onChange({ ...data, [key]: e.target.value });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onChange({ ...data, logo: reader.result as string });
      reader.readAsDataURL(file);
    } else {
      onChange({ ...data, logo: '' });
    }
  };

  return (
    <div>
      {/* Kop Surat */}
      <div className="form-section-title">Kop Surat</div>

      <div className="form-field">
        <label className="form-label">Logo Instansi (Opsional)</label>
        <input type="file" accept="image/*" className="form-input" style={{ fontSize: '0.72rem', padding: '0.3rem 0.5rem' }} onChange={handleImageUpload} />
      </div>
      <div className="form-field">
        <label className="form-label">Nama Instansi / Perusahaan</label>
        <input type="text" className="form-input" value={data.companyName} onChange={set('companyName')} placeholder="PT PERTAMINA (PERSERO)" />
      </div>
      <div className="form-field">
        <label className="form-label">Nama Departemen / Fungsi</label>
        <input type="text" className="form-input" value={data.departmentName} onChange={set('departmentName')} placeholder="FUNGSI INFORMATION TECHNOLOGY" />
      </div>
      <div className="form-field">
        <label className="form-label">Alamat & Kontak</label>
        <textarea className="form-input" rows={2} style={{ resize: 'none' }} value={data.companyAddress} onChange={set('companyAddress')} placeholder="Jl. Medan Merdeka..." />
      </div>

      {/* Informasi Surat */}
      <div className="form-section-title" style={{ marginTop: '1rem' }}>Informasi Surat</div>

      <div className="form-grid-2">
        <div className="form-field">
          <label className="form-label">Nomor Surat</label>
          <input type="text" className="form-input" value={data.letterNumber} onChange={set('letterNumber')} placeholder="Auto-generated" />
        </div>
        <div className="form-field">
          <label className="form-label">Tanggal</label>
          <input type="date" className="form-input" value={data.date} onChange={set('date')} />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Klasifikasi</label>
        <select className="form-input" value={data.classification} onChange={set('classification')}>
          <option value="BIASA">BIASA</option>
          <option value="SEGERA">SEGERA</option>
          <option value="RAHASIA">RAHASIA</option>
        </select>
      </div>

      <div className="form-field">
        <label className="form-label">Kepada (Yth.)</label>
        <input type="text" className="form-input" value={data.to} onChange={set('to')} placeholder="Nama / Jabatan penerima" />
      </div>
      <div className="form-field">
        <label className="form-label">Dari</label>
        <input type="text" className="form-input" value={data.from} onChange={set('from')} placeholder="Nama / Jabatan pengirim" />
      </div>
      <div className="form-field">
        <label className="form-label">Perihal / Subjek</label>
        <input type="text" className="form-input" value={data.subject} onChange={set('subject')} placeholder="Judul atau pokok bahasan memo" />
      </div>

      {/* Isi Memo */}
      <div className="form-section-title" style={{ marginTop: '1rem' }}>Isi Memo</div>

      <div className="form-field">
        <label className="form-label">Isi Surat</label>
        <textarea
          className="form-input"
          rows={7}
          style={{ resize: 'none', lineHeight: '1.55' }}
          value={data.body}
          onChange={set('body')}
          placeholder="Tulis isi memo di sini. Gunakan Enter untuk memisahkan paragraf..."
        />
      </div>

      {/* AI Assistant */}
      <AIAssistant
        letterType="memo"
        context={{ subject: data.subject, to: data.to, from: data.from }}
        onApply={(text) => onChange({ ...data, body: text })}
        fieldLabel="Isi Memo"
      />

      {/* Penandatangan */}
      <div className="form-section-title" style={{ marginTop: '1rem' }}>Penandatangan</div>

      <div className="form-grid-2">
        <div className="form-field">
          <label className="form-label">Nama Penandatangan</label>
          <input type="text" className="form-input" value={data.signerName} onChange={set('signerName')} placeholder="Nama lengkap" />
        </div>
        <div className="form-field">
          <label className="form-label">Jabatan</label>
          <input type="text" className="form-input" value={data.signerTitle} onChange={set('signerTitle')} placeholder="Jabatan / posisi" />
        </div>
      </div>
    </div>
  );
}
