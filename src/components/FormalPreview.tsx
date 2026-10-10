'use client';

import React from 'react';
import { FormalFormData } from '@/types/letter';
import { formatDateIndonesia } from '@/lib/numbering';

export default function FormalPreview({ data }: { data: FormalFormData }) {
  const bodyParagraphs = data.body
    ? data.body.split('\n').filter((p) => p.trim() !== '')
    : [];
    
  const headerLines = data.headerName
    ? data.headerName.split('\n').filter((p) => p.trim() !== '')
    : [];

  const toLines = data.to
    ? data.to.split('\n').filter((p) => p.trim() !== '')
    : [];

  return (
    <div
      id="letter-preview"
      className="bg-white text-gray-900 font-serif"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '15mm 25mm 15mm 25mm',
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '11pt',
        lineHeight: '1.4',
        boxSizing: 'border-box',
      }}
    >
      {/* ===== KOP SURAT ===== */}
      <div style={{ borderBottom: '3px solid black', paddingBottom: '2px', marginBottom: '20px' }}>
        <div style={{ borderBottom: '1px solid black', paddingBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ width: '80px', display: 'flex', justifyContent: 'flex-start' }}>
            {data.logoLeft && <img src={data.logoLeft} style={{ maxWidth: '80px', maxHeight: '80px', objectFit: 'contain' }} alt="Logo 1" />}
          </div>
          
          <div style={{ flex: 1, textAlign: 'center', padding: '0 10px' }}>
            {headerLines.map((line, i) => (
               <div key={i} style={{ fontSize: i === 0 ? '13pt' : '11pt', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: '1.2' }}>
                 {line}
               </div>
            ))}
            <div style={{ fontSize: '10pt', marginTop: '4px' }}>{data.headerAddress}</div>
            <div style={{ fontSize: '10pt' }}>{data.headerContact}</div>
          </div>
          
          <div style={{ width: '80px', display: 'flex', justifyContent: 'flex-end' }}>
             {data.logoRight && <img src={data.logoRight} style={{ maxWidth: '80px', maxHeight: '80px', objectFit: 'contain' }} alt="Logo 2" />}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '55%' }}>
           <table style={{ width: '100%', fontSize: '11pt', borderCollapse: 'collapse' }}>
             <tbody>
               <tr>
                 <td style={{ width: '25%', verticalAlign: 'top', paddingBottom: '4px' }}>Nomor</td>
                 <td style={{ width: '2%', verticalAlign: 'top', paddingBottom: '4px' }}>:</td>
                 <td style={{ verticalAlign: 'top', paddingBottom: '4px' }}>{data.letterNumber}</td>
               </tr>
               <tr>
                 <td style={{ verticalAlign: 'top', paddingBottom: '4px' }}>Lampiran</td>
                 <td style={{ verticalAlign: 'top', paddingBottom: '4px' }}>:</td>
                 <td style={{ verticalAlign: 'top', paddingBottom: '4px' }}>{data.attachment || '-'}</td>
               </tr>
               <tr>
                 <td style={{ verticalAlign: 'top' }}>Perihal</td>
                 <td style={{ verticalAlign: 'top' }}>:</td>
                 <td style={{ verticalAlign: 'top' }}>{data.subject}</td>
               </tr>
             </tbody>
           </table>
        </div>
        <div style={{ width: '40%', textAlign: 'right', fontSize: '11pt' }}>
           {data.location}, {data.date ? formatDateIndonesia(data.date) : ''}
        </div>
      </div>

      {/* ===== KEPADA YTH ===== */}
      <div style={{ marginBottom: '20px', fontSize: '11pt' }}>
        <div style={{ marginBottom: '2px' }}>Kepada Yth.</div>
        {toLines.map((line, i) => (
           <div key={i} style={{ fontWeight: i === 0 ? 'bold' : 'normal', marginBottom: '2px' }}>{line}</div>
        ))}
        {data.to && <div>di Tempat</div>}
      </div>

      {/* ===== SALAM PEMBUKA ===== */}
      <div style={{ marginBottom: '10px', fontSize: '11pt' }}>
        {data.greeting}
      </div>

      {/* ===== ISI ===== */}
      <div style={{ marginBottom: '20px', textAlign: 'justify', fontSize: '11pt' }}>
        {bodyParagraphs.length > 0 ? (
          bodyParagraphs.map((para, i) => (
            <p key={i} style={{ marginBottom: '8px', textIndent: '30px' }}>
              {para}
            </p>
          ))
        ) : (
          <p style={{ color: '#aaa', fontStyle: 'italic', textIndent: '0' }}>Isi surat akan ditampilkan di sini...</p>
        )}
      </div>
      
      {/* ===== SALAM PENUTUP ===== */}
      <div style={{ marginBottom: '40px', textAlign: 'justify', fontSize: '11pt' }}>
        {data.closing}
      </div>

      {/* ===== TANDA TANGAN ===== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '11pt' }}>
         <div style={{ textAlign: 'center', width: '45%' }}>
            {data.signer1Title && <div style={{ marginBottom: '70px', minHeight: '20px' }}>{data.signer1Title}</div>}
            {data.signer1Name && <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{data.signer1Name}</div>}
         </div>
         <div style={{ textAlign: 'center', width: '45%' }}>
            {data.signer2Title && <div style={{ marginBottom: '70px', minHeight: '20px' }}>{data.signer2Title}</div>}
            {data.signer2Name && <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{data.signer2Name}</div>}
         </div>
      </div>
      
    </div>
  );
}
