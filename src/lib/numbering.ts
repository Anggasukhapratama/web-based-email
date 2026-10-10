const MONTH_ROMAN: Record<number, string> = {
  1: 'I', 2: 'II', 3: 'III', 4: 'IV',
  5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII',
  9: 'IX', 10: 'X', 11: 'XI', 12: 'XII',
};

const SEQUENCE_KEY_MEMO = 'quickletter_seq_memo';
const SEQUENCE_KEY_SIKA = 'quickletter_seq_sika';
const SEQUENCE_KEY_FORMAL = 'quickletter_seq_formal';

function getSequenceKey(type: LetterType): string {
  if (type === 'memo') return SEQUENCE_KEY_MEMO;
  if (type === 'sika') return SEQUENCE_KEY_SIKA;
  return SEQUENCE_KEY_FORMAL;
}

function getStoredData(key: string): { seq: number; month: number; year: number } {
  if (typeof window === 'undefined') return { seq: 1, month: new Date().getMonth() + 1, year: new Date().getFullYear() };
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { seq: 1, month: new Date().getMonth() + 1, year: new Date().getFullYear() };
    return JSON.parse(raw);
  } catch {
    return { seq: 1, month: new Date().getMonth() + 1, year: new Date().getFullYear() };
  }
}

import { LetterType } from '@/types/letter';

export function generateLetterNumber(type: LetterType): string {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const key = getSequenceKey(type);
  let stored = getStoredData(key);

  // Reset sequence if month/year changed
  if (stored.month !== currentMonth || stored.year !== currentYear) {
    stored = { seq: 1, month: currentMonth, year: currentYear };
  }

  const seqStr = String(stored.seq).padStart(3, '0');
  const monthRoman = MONTH_ROMAN[currentMonth];
  const yearStr = String(currentYear);

  if (type === 'memo') {
    return `${seqStr}/MEMO/IT-PTM/${monthRoman}/${yearStr}`;
  } else if (type === 'sika') {
    return `${seqStr}/SIKA/IT-PTM/${monthRoman}/${yearStr}`;
  } else {
    return `${seqStr}/S-FORMAL/${monthRoman}/${yearStr}`;
  }
}

export function incrementAndSaveSequence(type: LetterType): void {
  if (typeof window === 'undefined') return;
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const key = getSequenceKey(type);
  let stored = getStoredData(key);

  if (stored.month !== currentMonth || stored.year !== currentYear) {
    stored = { seq: 1, month: currentMonth, year: currentYear };
  }

  stored.seq += 1;
  localStorage.setItem(key, JSON.stringify(stored));
}

export function getCurrentSequence(type: LetterType): number {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const key = getSequenceKey(type);
  const stored = getStoredData(key);
  if (stored.month !== currentMonth || stored.year !== currentYear) return 1;
  return stored.seq;
}

export function formatDateIndonesia(dateStr: string): string {
  if (!dateStr) return '';
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
