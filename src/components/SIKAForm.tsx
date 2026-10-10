'use client';

import React from 'react';
import { SIKAFormData } from '@/types/letter';

interface SIKAFormProps {
  data: SIKAFormData;
  onChange: (data: SIKAFormData) => void;
}

const inputClass =
  'w-full bg-slate-800/60 border border-slate-700/60 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/70 focus:bg-slate-800 focus:ring-1 focus:ring-blue-500/30 transition-all duration-150';
const labelClass = 'block text-xs font-medium text-slate-400 mb-1';
const fieldGroup = 'space-y-1';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="pb-2 border-b border-slate-700/50 pt-1">
    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{title}</h3>
  </div>
);

export default function SIKAForm({ data, onChange }: SIKAFormProps) {
  const set = (key: keyof SIKAFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <div className="space-y-4">
      <SectionHeader title="Kop Surat (Header)" />
      
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

      <SectionHeader title="Informasi Surat" />

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
          <label className={labelClass}>Tanggal Terbit</label>
          <input
            type="date"
            className={inputClass}
            value={data.date}
            onChange={set('date')}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={fieldGroup}>
          <label className={labelClass}>Berlaku Dari</label>
          <input
            type="date"
            className={inputClass}
            value={data.validFrom}
            onChange={set('validFrom')}
          />
        </div>
        <div className={fieldGroup}>
          <label className={labelClass}>Berlaku Sampai</label>
          <input
            type="date"
            className={inputClass}
            value={data.validUntil}
            onChange={set('validUntil')}
          />
        </div>
      </div>

      <SectionHeader title="Data Pemohon (Pertamina)" />

      <div className={fieldGroup}>
        <label className={labelClass}>Nama Pemohon</label>
        <input
          type="text"
          className={inputClass}
          value={data.requestorName}
          onChange={set('requestorName')}
          placeholder="Nama lengkap karyawan"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={fieldGroup}>
          <label className={labelClass}>NIK / NRP</label>
          <input
            type="text"
            className={inputClass}
            value={data.requestorNIK}
            onChange={set('requestorNIK')}
            placeholder="NIK karyawan"
          />
        </div>
        <div className={fieldGroup}>
          <label className={labelClass}>Departemen</label>
          <input
            type="text"
            className={inputClass}
            value={data.requestorDept}
            onChange={set('requestorDept')}
            placeholder="IT / Operasional"
          />
        </div>
      </div>

      <SectionHeader title="Data Vendor / Kontraktor" />

      <div className={fieldGroup}>
        <label className={labelClass}>Nama Perusahaan Vendor</label>
        <input
          type="text"
          className={inputClass}
          value={data.vendorName}
          onChange={set('vendorName')}
          placeholder="PT. Nama Vendor"
        />
      </div>

      <div className={fieldGroup}>
        <label className={labelClass}>Person In Charge (PIC) Vendor</label>
        <input
          type="text"
          className={inputClass}
          value={data.vendorPIC}
          onChange={set('vendorPIC')}
          placeholder="Nama PIC dari vendor"
        />
      </div>

      <SectionHeader title="Detail Pekerjaan" />

      <div className={fieldGroup}>
        <label className={labelClass}>Lokasi Pekerjaan</label>
        <input
          type="text"
          className={inputClass}
          value={data.workLocation}
          onChange={set('workLocation')}
          placeholder="Gedung, Area, Lantai"
        />
      </div>

      <div className={fieldGroup}>
        <label className={labelClass}>Deskripsi Pekerjaan</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          value={data.workDescription}
          onChange={set('workDescription')}
          placeholder="Uraian singkat pekerjaan yang akan dilakukan"
        />
      </div>

      <div className={fieldGroup}>
        <label className={labelClass}>Peralatan yang Digunakan</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={2}
          value={data.equipmentUsed}
          onChange={set('equipmentUsed')}
          placeholder="Daftar peralatan / tools"
        />
      </div>

      <div className={fieldGroup}>
        <label className={labelClass}>Persyaratan Keselamatan (HSE)</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          value={data.safetyRequirements}
          onChange={set('safetyRequirements')}
          placeholder="APD wajib, prosedur keselamatan, dll."
        />
      </div>

      <SectionHeader title="Persetujuan" />

      <div className="grid grid-cols-2 gap-3">
        <div className={fieldGroup}>
          <label className={labelClass}>Nama Approver</label>
          <input
            type="text"
            className={inputClass}
            value={data.approverName}
            onChange={set('approverName')}
            placeholder="Nama penyetuju"
          />
        </div>
        <div className={fieldGroup}>
          <label className={labelClass}>Jabatan Approver</label>
          <input
            type="text"
            className={inputClass}
            value={data.approverTitle}
            onChange={set('approverTitle')}
            placeholder="Jabatan / posisi"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={fieldGroup}>
          <label className={labelClass}>Nama Saksi</label>
          <input
            type="text"
            className={inputClass}
            value={data.witnessName}
            onChange={set('witnessName')}
            placeholder="Nama saksi"
          />
        </div>
        <div className={fieldGroup}>
          <label className={labelClass}>Jabatan Saksi</label>
          <input
            type="text"
            className={inputClass}
            value={data.witnessTitle}
            onChange={set('witnessTitle')}
            placeholder="Jabatan / posisi"
          />
        </div>
      </div>
    </div>
  );
}
