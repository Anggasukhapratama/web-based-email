'use client';

import React from 'react';
import { MemoFormData } from '@/types/letter';
import { formatDateIndonesia } from '@/lib/numbering';

interface MemoPreviewProps {
  data: MemoFormData;
}

export default function MemoPreview({ data }: MemoPreviewProps) {
  const classificationColor: Record<string, string> = {
    BIASA: 'text-slate-600',
    SEGERA: 'text-amber-600',
    RAHASIA: 'text-red-700',
  };

  const bodyParagraphs = data.body
    ? data.body.split('\n').filter((p) => p.trim() !== '')
    : [];

  return (
    <div
      id="letter-preview"
      className="bg-white text-gray-900 font-serif"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm 25mm 20mm 30mm',
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '12pt',
        lineHeight: '1.5',
        boxSizing: 'border-box',
      }}
    >
      {/* ===== KOP SURAT ===== */}
      <div style={{ borderBottom: '3px solid #003366', paddingBottom: '10px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Logo */}
          <div
            style={{
              width: '70px',
              height: '70px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: data.logo ? 'transparent' : 'linear-gradient(135deg, #003366, #0055AA)',
              borderRadius: '6px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '10pt',
              letterSpacing: '1px',
              textAlign: 'center',
              lineHeight: '1.2',
            }}
          >
            {data.logo ? (
              <img src={data.logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            ) : (
              <span>COMPANY<br />LOGO</span>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '9pt', color: '#555', margin: 0, fontFamily: 'Arial, sans-serif' }}>
              {data.companyName}
            </p>
            <h1 style={{ fontSize: '16pt', fontWeight: 'bold', color: '#003366', margin: '2px 0', fontFamily: 'Arial, sans-serif', letterSpacing: '0.5px' }}>
              {data.departmentName}
            </h1>
            <p style={{ fontSize: '8.5pt', color: '#666', margin: 0, fontFamily: 'Arial, sans-serif', whiteSpace: 'pre-line' }}>
              {data.companyAddress}
            </p>
          </div>
          {/* Classification badge */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <span
              style={{
                border: '2px solid currentColor',
                padding: '3px 10px',
                fontSize: '9pt',
                fontWeight: 'bold',
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '2px',
                color: data.classification === 'RAHASIA' ? '#CC0000' : data.classification === 'SEGERA' ? '#B45309' : '#555555',
              }}
            >
              {data.classification || 'BIASA'}
            </span>
          </div>
        </div>
      </div>

      {/* ===== JUDUL ===== */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '13pt', fontWeight: 'bold', letterSpacing: '3px', margin: 0, fontFamily: 'Arial, sans-serif', color: '#003366' }}>
          MEMORANDUM INTERNAL
        </h2>
      </div>

      {/* ===== META INFO ===== */}
      <table style={{ width: '100%', marginBottom: '16px', borderCollapse: 'collapse', fontSize: '11pt' }}>
        <tbody>
          {[
            { label: 'Nomor', value: data.letterNumber || '___/MEMO/IT-PTM/___/___' },
            { label: 'Tanggal', value: data.date ? formatDateIndonesia(data.date) : '___' },
            { label: 'Kepada Yth.', value: data.to || '___' },
            { label: 'Dari', value: data.from || '___' },
            { label: 'Fungsi / Bagian', value: data.department || '___' },
            { label: 'Perihal', value: data.subject || '___' },
          ].map((row, i) => (
            <tr key={i}>
              <td style={{ width: '30%', padding: '3px 0', verticalAlign: 'top', fontFamily: 'Arial, sans-serif', fontSize: '10.5pt', color: '#333' }}>
                {row.label}
              </td>
              <td style={{ width: '2%', padding: '3px 8px', verticalAlign: 'top' }}>:</td>
              <td style={{ padding: '3px 0', verticalAlign: 'top', fontWeight: row.label === 'Perihal' ? 'bold' : 'normal', fontFamily: 'Arial, sans-serif', fontSize: '10.5pt' }}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== DIVIDER ===== */}
      <div style={{ borderTop: '1px solid #ccc', marginBottom: '16px' }} />

      {/* ===== BODY ===== */}
      <div style={{ marginBottom: '40px', fontFamily: 'Times New Roman, Times, serif', fontSize: '11.5pt', textAlign: 'justify' }}>
        {bodyParagraphs.length > 0 ? (
          bodyParagraphs.map((para, i) => (
            <p key={i} style={{ marginBottom: '10px', textIndent: '2em' }}>
              {para}
            </p>
          ))
        ) : (
          <p style={{ color: '#aaa', fontStyle: 'italic' }}>Isi memo akan ditampilkan di sini...</p>
        )}
      </div>

      {/* ===== PENUTUP ===== */}
      <p style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '11.5pt', marginBottom: '40px' }}>
        Demikian memo ini disampaikan, atas perhatian dan kerja samanya diucapkan terima kasih.
      </p>

      {/* ===== TTD ===== */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ textAlign: 'center', minWidth: '200px' }}>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '10.5pt', margin: 0 }}>
            Jakarta, {data.date ? formatDateIndonesia(data.date) : '___'}
          </p>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '10.5pt', marginTop: '4px', marginBottom: 0 }}>
            {data.signerTitle || 'Jabatan'}
          </p>
          {/* Signature space */}
          <div style={{ height: '60px', borderBottom: '1px solid #999', margin: '8px 20px 4px' }} />
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '10.5pt', fontWeight: 'bold', margin: 0 }}>
            {data.signerName || 'Nama Penandatangan'}
          </p>
        </div>
      </div>


    </div>
  );
}
