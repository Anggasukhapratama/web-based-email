'use client';

import React from 'react';
import { SIKAFormData } from '@/types/letter';
import AIAssistant from './AIAssistant';

interface SIKAFormProps {
  data: SIKAFormData;
  onChange: (data: SIKAFormData) => void;
}

export default function SIKAForm({ data, onChange }: SIKAFormProps) {
  const set = (key: keyof SIKAFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          <label className="form-label">Tanggal Terbit</label>
          <input type="date" className="form-input" value={data.date} onChange={set('date')} />
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-field">
          <label className="form-label">Berlaku Dari</label>
          <input type="date" className="form-input" value={data.validFrom} onChange={set('validFrom')} />
        </div>
        <div className="form-field">
          <label className="form-label">Berlaku Sampai</label>
          <input type="date" className="form-input" value={data.validUntil} onChange={set('validUntil')} />
        </div>
      </div>

      {/* Data Pemohon */}
      <div className="form-section-title" style={{ marginTop: '1rem' }}>Data Pemohon (Pertamina)</div>

      <div className="form-field">
        <label className="form-label">Nama Pemohon</label>
        <input type="text" className="form-input" value={data.requestorName} onChange={set('requestorName')} placeholder="Nama lengkap karyawan" />
      </div>

      <div className="form-grid-2">
        <div className="form-field">
          <label className="form-label">NIK / NRP</label>
          <input type="text" className="form-input" value={data.requestorNIK} onChange={set('requestorNIK')} placeholder="NIK karyawan" />
        </div>
        <div className="form-field">
          <label className="form-label">Departemen</label>
          <input type="text" className="form-input" value={data.requestorDept} onChange={set('requestorDept')} placeholder="IT / Operasional" />
        </div>
      </div>

      {/* Data Vendor */}
      <div className="form-section-title" style={{ marginTop: '1rem' }}>Data Vendor / Kontraktor</div>

      <div className="form-field">
        <label className="form-label">Nama Perusahaan Vendor</label>
        <input type="text" className="form-input" value={data.vendorName} onChange={set('vendorName')} placeholder="PT. Nama Vendor" />
      </div>
      <div className="form-field">
        <label className="form-label">Person In Charge (PIC) Vendor</label>
        <input type="text" className="form-input" value={data.vendorPIC} onChange={set('vendorPIC')} placeholder="Nama PIC dari vendor" />
      </div>

      {/* Detail Pekerjaan */}
      <div className="form-section-title" style={{ marginTop: '1rem' }}>Detail Pekerjaan</div>

      <div className="form-field">
        <label className="form-label">Lokasi Pekerjaan</label>
        <input type="text" className="form-input" value={data.workLocation} onChange={set('workLocation')} placeholder="Gedung, Area, Lantai" />
      </div>
      <div className="form-field">
        <label className="form-label">Deskripsi Pekerjaan</label>
        <textarea className="form-input" rows={3} style={{ resize: 'none', lineHeight: '1.55' }} value={data.workDescription} onChange={set('workDescription')} placeholder="Uraian singkat pekerjaan yang akan dilakukan" />
      </div>

      {/* AI Assistant for work description */}
      <AIAssistant
        letterType="sika"
        context={{ workDescription: data.workDescription }}
        onApply={(text) => onChange({ ...data, workDescription: text })}
        fieldLabel="Deskripsi Pekerjaan"
      />

      <div className="form-field" style={{ marginTop: '0.75rem' }}>
        <label className="form-label">Peralatan yang Digunakan</label>
        <textarea className="form-input" rows={2} style={{ resize: 'none', lineHeight: '1.55' }} value={data.equipmentUsed} onChange={set('equipmentUsed')} placeholder="Daftar peralatan / tools" />
      </div>
      <div className="form-field">
        <label className="form-label">Persyaratan Keselamatan (HSE)</label>
        <textarea className="form-input" rows={3} style={{ resize: 'none', lineHeight: '1.55' }} value={data.safetyRequirements} onChange={set('safetyRequirements')} placeholder="APD wajib, prosedur keselamatan, dll." />
      </div>

      {/* Persetujuan */}
      <div className="form-section-title" style={{ marginTop: '1rem' }}>Persetujuan</div>

      <div className="form-grid-2">
        <div className="form-field">
          <label className="form-label">Nama Approver</label>
          <input type="text" className="form-input" value={data.approverName} onChange={set('approverName')} placeholder="Nama penyetuju" />
        </div>
        <div className="form-field">
          <label className="form-label">Jabatan Approver</label>
          <input type="text" className="form-input" value={data.approverTitle} onChange={set('approverTitle')} placeholder="Jabatan / posisi" />
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-field">
          <label className="form-label">Nama Saksi</label>
          <input type="text" className="form-input" value={data.witnessName} onChange={set('witnessName')} placeholder="Nama saksi" />
        </div>
        <div className="form-field">
          <label className="form-label">Jabatan Saksi</label>
          <input type="text" className="form-input" value={data.witnessTitle} onChange={set('witnessTitle')} placeholder="Jabatan / posisi" />
        </div>
      </div>
    </div>
  );
}
