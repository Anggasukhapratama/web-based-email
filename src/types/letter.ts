export type LetterType = 'memo' | 'sika' | 'formal';

export interface MemoFormData {
  letterNumber: string;
  date: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  signerName: string;
  signerTitle: string;
  department: string;
  logo?: string;
  companyName: string;
  departmentName: string;
  companyAddress: string;
  classification: 'BIASA' | 'SEGERA' | 'RAHASIA';
}

export interface SIKAFormData {
  letterNumber: string;
  date: string;
  validFrom: string;
  validUntil: string;
  requestorName: string;
  requestorNIK: string;
  requestorDept: string;
  vendorName: string;
  vendorPIC: string;
  workLocation: string;
  workDescription: string;
  equipmentUsed: string;
  safetyRequirements: string;
  approverName: string;
  approverTitle: string;
  witnessName: string;
  witnessTitle: string;
  logo?: string;
  companyName: string;
  departmentName: string;
  companyAddress: string;
}

export interface FormalFormData {
  logoLeft: string; // base64 data url
  logoRight: string; // base64 data url
  headerName: string;
  headerAddress: string;
  headerContact: string;
  letterNumber: string;
  date: string;
  attachment: string;
  subject: string;
  to: string;
  greeting: string;
  body: string;
  closing: string;
  location: string;
  signer1Title: string;
  signer1Name: string;
  signer2Title: string;
  signer2Name: string;
}

export interface AutoNumberConfig {
  sequence: number;
  month: number;
  year: number;
}
