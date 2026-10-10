'use client';

import React from 'react';
import { SIKAFormData } from '@/types/letter';
import { formatDateIndonesia } from '@/lib/numbering';

interface SIKAPreviewProps {
  data: SIKAFormData;
}

const Cell = ({
  children,
  bold,
  center,
  gray,
  colSpan,
}: {
  children: React.ReactNode;
  bold?: boolean;
  center?: boolean;
  gray?: boolean;
  colSpan?: number;
}) => (
  <td
    colSpan={colSpan}
    style={{
      border: '1px solid #999',
      padding: '5px 8px',
      fontSize: '10pt',
      fontFamily: 'Arial, sans-serif',
      fontWeight: bold ? 'bold' : 'normal',
      textAlign: center ? 'center' : 'left',
      backgroundColor: gray ? '#f0f0f0' : 'transparent',
      verticalAlign: 'top',
    }}
  >
    {children}
  </td>
);

export default function SIKAPreview({ data }: SIKAPreviewProps) {
  const safetyItems = data.safetyRequirements
    ? data.safetyRequirements.split('\n').filter((s) => s.trim())
    : [];

  const equipmentItems = data.equipmentUsed
    ? data.equipmentUsed.split('\n').filter((s) => s.trim())
    : [];

  return (
    <div
      id="letter-preview"
      className="bg-white text-gray-900"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '15mm 20mm 15mm 25mm',
        fontFamily: 'Arial, sans-serif',
        fontSize: '11pt',
        boxSizing: 'border-box',
      }}
    >
      {/* ===== KOP SURAT ===== */}
      <div style={{ borderBottom: '3px solid #003366', paddingBottom: '8px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: data.logo ? 'transparent' : 'linear-gradient(135deg, #003366, #0055AA)',
              borderRadius: '6px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '9pt',
              textAlign: 'center',
              lineHeight: '1.3',
            }}
          >
            {data.logo ? (
              <img src={data.logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            ) : (
              <>PT<br />PERTAMINA</>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '8pt', color: '#555', margin: 0 }}>{data.companyName}</p>
            <h1 style={{ fontSize: '14pt', fontWeight: 'bold', color: '#003366', margin: '2px 0', letterSpacing: '0.5px' }}>
              {data.departmentName}
            </h1>
            <p style={{ fontSize: '8pt', color: '#666', margin: 0, whiteSpace: 'pre-line' }}>
              {data.companyAddress}
            </p>
          </div>
        </div>
      </div>

      {/* ===== JUDUL ===== */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '13pt', fontWeight: 'bold', letterSpacing: '2px', margin: 0, color: '#003366', textDecoration: 'underline' }}>
          SURAT IZIN KERJA AMAN (SIKA)
        </h2>
      </div>

      {/* ===== INFO SURAT ===== */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
        <tbody>
          <tr>
            <Cell gray bold>Nomor Surat</Cell>
            <Cell>{data.letterNumber || '___/SIKA/IT-PTM/___/___'}</Cell>
            <Cell gray bold>Tanggal Terbit</Cell>
            <Cell>{data.date ? formatDateIndonesia(data.date) : '___'}</Cell>
          </tr>
          <tr>
            <Cell gray bold>Berlaku Dari</Cell>
            <Cell>{data.validFrom ? formatDateIndonesia(data.validFrom) : '___'}</Cell>
            <Cell gray bold>Berlaku Sampai</Cell>
            <Cell>{data.validUntil ? formatDateIndonesia(data.validUntil) : '___'}</Cell>
          </tr>
        </tbody>
      </table>

      {/* ===== BAGIAN A: DATA PEMOHON ===== */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
        <thead>
          <tr>
            <td
              colSpan={4}
              style={{
                background: '#003366',
                color: 'white',
                fontWeight: 'bold',
                padding: '6px 8px',
                fontSize: '10pt',
                letterSpacing: '1px',
              }}
            >
              A. DATA PEMOHON (INTERNAL PERTAMINA)
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell gray bold>Nama Pemohon</Cell>
            <Cell>{data.requestorName || '___'}</Cell>
            <Cell gray bold>NIK / NRP</Cell>
            <Cell>{data.requestorNIK || '___'}</Cell>
          </tr>
          <tr>
            <Cell gray bold>Departemen / Fungsi</Cell>
            <Cell colSpan={3}>{data.requestorDept || '___'}</Cell>
          </tr>
        </tbody>
      </table>

      {/* ===== BAGIAN B: DATA VENDOR ===== */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
        <thead>
          <tr>
            <td
              colSpan={4}
              style={{
                background: '#003366',
                color: 'white',
                fontWeight: 'bold',
                padding: '6px 8px',
                fontSize: '10pt',
                letterSpacing: '1px',
              }}
            >
              B. DATA VENDOR / KONTRAKTOR
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell gray bold>Nama Perusahaan</Cell>
            <Cell>{data.vendorName || '___'}</Cell>
            <Cell gray bold>PIC / Penanggung Jawab</Cell>
            <Cell>{data.vendorPIC || '___'}</Cell>
          </tr>
        </tbody>
      </table>

      {/* ===== BAGIAN C: DETAIL PEKERJAAN ===== */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
        <thead>
          <tr>
            <td
              colSpan={2}
              style={{
                background: '#003366',
                color: 'white',
                fontWeight: 'bold',
                padding: '6px 8px',
                fontSize: '10pt',
                letterSpacing: '1px',
              }}
            >
              C. DETAIL PEKERJAAN
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell gray bold>Lokasi Pekerjaan</Cell>
            <Cell>{data.workLocation || '___'}</Cell>
          </tr>
          <tr>
            <Cell gray bold>Deskripsi Pekerjaan</Cell>
            <Cell>
              <div style={{ minHeight: '40px', whiteSpace: 'pre-wrap' }}>
                {data.workDescription || '___'}
              </div>
            </Cell>
          </tr>
          <tr>
            <Cell gray bold>Peralatan Digunakan</Cell>
            <Cell>
              {equipmentItems.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '16px' }}>
                  {equipmentItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              ) : (
                '___'
              )}
            </Cell>
          </tr>
        </tbody>
      </table>

      {/* ===== BAGIAN D: KESELAMATAN ===== */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px' }}>
        <thead>
          <tr>
            <td
              colSpan={2}
              style={{
                background: '#CC3300',
                color: 'white',
                fontWeight: 'bold',
                padding: '6px 8px',
                fontSize: '10pt',
                letterSpacing: '1px',
              }}
            >
              D. PERSYARATAN KESELAMATAN (HSE)
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell colSpan={2}>
              {safetyItems.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '16px' }}>
                  {safetyItems.map((item, i) => <li key={i} style={{ marginBottom: '2px' }}>{item}</li>)}
                </ul>
              ) : (
                <span style={{ color: '#aaa', fontStyle: 'italic' }}>Belum diisi...</span>
              )}
            </Cell>
          </tr>
        </tbody>
      </table>

      {/* ===== TANDA TANGAN ===== */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px' }}>
        <thead>
          <tr>
            <td
              colSpan={2}
              style={{
                background: '#003366',
                color: 'white',
                fontWeight: 'bold',
                padding: '6px 8px',
                fontSize: '10pt',
                letterSpacing: '1px',
              }}
            >
              E. PERSETUJUAN DAN TANDA TANGAN
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #999', padding: '8px', textAlign: 'center', width: '50%' }}>
              <p style={{ fontSize: '10pt', fontWeight: 'bold', margin: '0 0 4px' }}>MENYETUJUI</p>
              <p style={{ fontSize: '9pt', margin: '0 0 2px', color: '#555' }}>{data.approverTitle || 'Jabatan Approver'}</p>
              <div style={{ height: '55px', borderBottom: '1px solid #555', margin: '6px 20px 4px' }} />
              <p style={{ fontSize: '10pt', fontWeight: 'bold', margin: 0 }}>{data.approverName || 'Nama Approver'}</p>
            </td>
            <td style={{ border: '1px solid #999', padding: '8px', textAlign: 'center', width: '50%' }}>
              <p style={{ fontSize: '10pt', fontWeight: 'bold', margin: '0 0 4px' }}>SAKSI / MENGETAHUI</p>
              <p style={{ fontSize: '9pt', margin: '0 0 2px', color: '#555' }}>{data.witnessTitle || 'Jabatan Saksi'}</p>
              <div style={{ height: '55px', borderBottom: '1px solid #555', margin: '6px 20px 4px' }} />
              <p style={{ fontSize: '10pt', fontWeight: 'bold', margin: 0 }}>{data.witnessName || 'Nama Saksi'}</p>
            </td>
          </tr>
        </tbody>
      </table>


    </div>
  );
}
