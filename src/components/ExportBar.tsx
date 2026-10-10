'use client';

import React, { useState } from 'react';
import { Download, Loader2, CheckCircle } from 'lucide-react';
import { incrementAndSaveSequence } from '@/lib/numbering';
import { LetterType } from '@/types/letter';

interface ExportBarProps {
  letterType: LetterType;
  letterNumber: string;
}

export default function ExportBar({ letterType, letterNumber }: ExportBarProps) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfDone, setPdfDone] = useState(false);

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      // We use the #print-target element (the raw letter preview)
      const element = document.getElementById('letter-preview');
      if (!element) {
        console.error('PDF export: #letter-preview element not found');
        return;
      }

      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      // Temporarily make the element's parent visible at full scale for capture
      const previewScaler = element.closest('.preview-scaler') as HTMLElement | null;
      const originalTransform = previewScaler?.style.transform || '';
      const originalMarginBottom = previewScaler?.style.marginBottom || '';

      if (previewScaler) {
        previewScaler.style.transform = 'scale(1)';
        previewScaler.style.marginBottom = '0';
      }

      const canvas = await html2canvas(element, {
        scale: 2,           // high DPI
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc) => {
          // Remove Tailwind CSS to avoid oklch color parsing crash
          const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach((s) => s.remove());

          // Make the cloned element render at full width
          const clonedEl = clonedDoc.getElementById('letter-preview') as HTMLElement | null;
          if (clonedEl) {
            clonedEl.style.transform = 'none';
            clonedEl.style.width = '794px';
          }
        },
      });

      // Restore original transform
      if (previewScaler) {
        previewScaler.style.transform = originalTransform;
        previewScaler.style.marginBottom = originalMarginBottom;
      }

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfW = pdf.internal.pageSize.getWidth();   // 210mm
      const pdfH = pdf.internal.pageSize.getHeight();  // 297mm
      const canvasRatio = canvas.height / canvas.width;
      const imgH = pdfW * canvasRatio;

      let heightLeft = imgH;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfW, imgH);
      heightLeft -= pdfH;

      while (heightLeft > 1) {
        position = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfW, imgH);
        heightLeft -= pdfH;
      }

      const fileName = letterNumber
        ? `${letterNumber.replace(/\//g, '-')}.pdf`
        : `quickletter-${letterType}-${Date.now()}.pdf`;

      pdf.save(fileName);
      incrementAndSaveSequence(letterType);
      setPdfDone(true);
      setTimeout(() => setPdfDone(false), 3000);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Gagal mengekspor PDF. Coba lagi atau gunakan Print (Ctrl+P).');
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownloadPDF}
      disabled={pdfLoading}
      className={`download-btn ${pdfDone ? 'success' : ''}`}
      title="Download PDF"
    >
      {pdfLoading ? (
        <>
          <Loader2 style={{ width: '14px', height: '14px', animation: 'spin 0.7s linear infinite' }} />
          <span>Memproses...</span>
        </>
      ) : pdfDone ? (
        <>
          <CheckCircle style={{ width: '14px', height: '14px' }} />
          <span>Berhasil!</span>
        </>
      ) : (
        <>
          <Download style={{ width: '14px', height: '14px' }} />
          <span>Download PDF</span>
        </>
      )}
    </button>
  );
}
