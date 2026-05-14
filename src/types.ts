/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'vi' | 'hmong' | 'tay';

export interface MedicineInfo {
  name: string;
  type: string;
  usage: string;
  dosage: string;
  warnings: string;
  sideEffects: string;
  expiryReminder: string;
  isSafe: boolean;
  confidence: number;
  description: string;
}

export interface SymptomResult {
  analysis: string;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  recommendation: string;
  firstAid?: string;
}

export interface Clinic {
  id: string;
  name: string;
  distance: string;
  address: string;
  phone: string;
  type: 'hospital' | 'pharmacy' | 'clinic';
  lat: number;
  lng: number;
}
