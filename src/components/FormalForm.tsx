'use client';

import React from 'react';
import { FormalFormData } from '@/types/letter';
import AIAssistant from './AIAssistant';

interface FormalFormProps {
  data: FormalFormData;
  onChange: (data: FormalFormData) => void;
}

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
      reader.onloadend = () => onChange({ ...data, [key]: reader.result as string });
      reader.readAsDataURL(file);
    } else {
      onChange({ ...data, [key]: '' });
    }
  };

  return (
    <div>
      {/* Kop Surat */}
      <div className="form-section-title">Kop Surat (Header)</div>

      <div className="form-grid-2">
        <div className="form-field">
          <label className="form-label">Logo Kiri (Opsional)</label>
          <input type="file" accept="image/*" className="form-input" style={{ fontSize: '0.72rem', padding: '0.3rem 0.5rem' }} onChange={handleImageUpload('logoLeft')} />
        </div>
        <div className="form-field">
          <label className="form-label">Logo Kanan (Opsional)</label>
          <input type="file" accept="image/*" className="form-input" style={{ fontSize: '0.72rem', padding: '0.3rem 0.5rem' }} onChange={handleImageUpload('logoRight')} />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Nama Instansi / Komisi</label>
        <textarea
          className="form-input"
          rows={2}
          style={{ resize: 'none', textAlign: 'center', lineHeight: '1.55' }}
          value={data.headerName}
          onChange={set('headerName')}
          placeholder="KOMISI HUBUNGAN ANTAR AGAMA..."
        />
      </div>
      <div className="form-field">
        <label className="form-label">Alamat</label>
        <input type="text" className="form-input" style={{ textAlign: 'center' }} value={data.headerAddress} onChange={set('headerAddress')} placeholder="Gedung Karya Pastoral..." />
      </div>
      <div className="form-field">
        <label className="form-label">Kontak</label>
        <input type="text" className="form-input" style={{ textAlign: 'center' }} value={data.headerContact} onChange={set('headerContact')} placeholder="Telp: 021-..." />
      </div>

      {/* Informasi Surat */}
      <div className="form-section-title" style={{ marginTop: '1rem' }}>Informasi Surat</div>

      <div className="form-grid-2">
        <div className="form-field">
          <label className="form-label">Nomor Surat</label>
          <input type="text" className="form-input" value={data.letterNumber} onChange={set('letterNumber')} />
        </div>
        <div className="form-field">
          <label className="form-label">Tanggal</label>
          <input type="date" className="form-input" value={data.date} onChange={set('date')} />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Lampiran</label>
        <input type="text" className="form-input" value={data.attachment} onChange={set('attachment')} placeholder="- / 1 Berkas" />
      </div>
      <div className="form-field">
        <label className="form-label">Perihal</label>
        <input type="text" className="form-input" value={data.subject} onChange={set('subject')} placeholder="Undangan Rapat..." />
      </div>
      <div className="form-field">
        <label className="form-label">Kepada Yth.</label>
        <textarea className="form-input" rows={2} style={{ resize: 'none', lineHeight: '1.55' }} value={data.to} onChange={set('to')} placeholder="Para Romo, Bapak/Ibu..." />
      </div>

      {/* Isi Surat */}
      <div className="form-section-title" style={{ marginTop: '1rem' }}>Isi Surat</div>

      <div className="form-field">
        <label className="form-label">Salam Pembuka</label>
        <input type="text" className="form-input" value={data.greeting} onChange={set('greeting')} placeholder="Dengan hormat," />
      </div>
      <div className="form-field">
        <label className="form-label">Isi</label>
        <textarea
          className="form-input"
          rows={6}
          style={{ resize: 'none', lineHeight: '1.55' }}
          value={data.body}
          onChange={set('body')}
          placeholder="Bersama ini kami..."
        />
      </div>

      {/* AI Assistant */}
      <AIAssistant
        letterType="formal"
        context={{ subject: data.subject, to: data.to }}
        onApply={(text) => onChange({ ...data, body: text })}
        fieldLabel="Isi Surat"
      />

      <div className="form-field" style={{ marginTop: '0.75rem' }}>
        <label className="form-label">Salam Penutup</label>
        <textarea className="form-input" rows={2} style={{ resize: 'none', lineHeight: '1.55' }} value={data.closing} onChange={set('closing')} placeholder="Demikianlah penjelasan dari kami..." />
      </div>

      {/* Penandatangan */}
      <div className="form-section-title" style={{ marginTop: '1rem' }}>Penandatangan</div>

      <div className="form-field">
        <label className="form-label">Lokasi (untuk tanggal ttd)</label>
        <input type="text" className="form-input" value={data.location} onChange={set('location')} placeholder="Jakarta" />
      </div>

      <div className="form-grid-2" style={{ marginTop: '0.25rem' }}>
        <div className="form-field">
          <label className="form-label">Jabatan 1 (Kiri)</label>
          <input type="text" className="form-input" value={data.signer1Title} onChange={set('signer1Title')} placeholder="Ketua" />
        </div>
        <div className="form-field">
          <label className="form-label">Nama 1 (Kiri)</label>
          <input type="text" className="form-input" value={data.signer1Name} onChange={set('signer1Name')} placeholder="Nama Ketua" />
        </div>
      </div>
      <div className="form-grid-2">
        <div className="form-field">
          <label className="form-label">Jabatan 2 (Kanan)</label>
          <input type="text" className="form-input" value={data.signer2Title} onChange={set('signer2Title')} placeholder="Sekretaris" />
        </div>
        <div className="form-field">
          <label className="form-label">Nama 2 (Kanan)</label>
          <input type="text" className="form-input" value={data.signer2Name} onChange={set('signer2Name')} placeholder="Nama Sekretaris" />
        </div>
      </div>
    </div>
  );
}
