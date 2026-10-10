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
      const element = document.getElementById('letter-preview');
      if (!element) return;

      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          // Remove all stylesheets from the cloned document to prevent html2canvas
          // from parsing Tailwind v4's oklch/lab variables, which causes a crash.
          // The preview components use purely inline styles, so this is perfectly safe.
          const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach(style => style.remove());
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasRatio = canvas.height / canvas.width;
      const imgHeight = pdfWidth * canvasRatio;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 1) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
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
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">

      {/* Download PDF Button */}
      <button
        onClick={handleDownloadPDF}
        disabled={pdfLoading}
        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg group ${
          pdfDone
            ? 'bg-green-500 text-white shadow-green-500/20'
            : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0'
        }`}
      >
        {pdfLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Memproses...</span>
          </>
        ) : pdfDone ? (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>Berhasil!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            <span>Download PDF</span>
          </>
        )}
      </button>
    </div>
  );
}
