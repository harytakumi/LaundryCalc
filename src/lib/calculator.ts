// Mengimplementasikan aturan bisnis BL-01 dan BL-02 untuk berat ditagih serta kalkulasi estimasi biaya.

import { ADD_ONS, APP_CONFIG, MAIN_SERVICES, STORE_INFO, type MainService, type ServiceCode } from '../config';

export interface WeightParseResult {
  isValid: boolean;
  value: number | null;
  reason?: 'empty' | 'invalid_format' | 'below_minimum';
}

export interface EstimateInput {
  serviceCode: ServiceCode;
  weightInput: string;
  hasDelivery: boolean;
  hasPremiumFragrance: boolean;
}

export interface EstimateResult {
  service: MainService;
  weightParse: WeightParseResult;
  actualWeight: number | null;
  billedWeight: number | null;
  isMinimumChargeApplied: boolean;
  mainCost: number | null;
  deliveryCost: number | null;
  fragranceCost: number | null;
  addOnCost: number | null;
  totalEstimate: number | null;
}

const VALID_DECIMAL_PATTERN = /^\d+([.,]\d+)?$/;

/** Mengurai teks input berat (menerima koma maupun titik) menjadi angka valid >= 0,1 kg. */
export function parseWeightInput(rawWeight: string): WeightParseResult {
  const trimmed = rawWeight.trim();

  if (trimmed === '') {
    return { isValid: false, value: null, reason: 'empty' };
  }

  if (!VALID_DECIMAL_PATTERN.test(trimmed)) {
    return { isValid: false, value: null, reason: 'invalid_format' };
  }

  const normalized = trimmed.replace(',', '.');
  const parsed = Number(normalized);

  if (!Number.isFinite(parsed) || parsed < APP_CONFIG.minWeightKg) {
    return { isValid: false, value: null, reason: 'below_minimum' };
  }

  return {
    isValid: true,
    value: parsed,
  };
}

/** Mengubah nilai berat sebesar delta (step 0,1 kg) sambil menjaga batas minimal 0,1 kg. */
export function stepWeightValue(rawWeight: string, delta: number): number {
  const parsed = parseWeightInput(rawWeight);
  const base = parsed.isValid && parsed.value !== null ? parsed.value : APP_CONFIG.defaultWeightKg;
  const next = Math.round((base + delta) * 10) / 10;
  return Math.max(APP_CONFIG.minWeightKg, next);
}

/** Menghitung berat ditagih serta rincian biaya layanan utama, tambahan, dan total estimasi. */
export function calculateLaundryEstimate(input: EstimateInput): EstimateResult {
  const service =
    MAIN_SERVICES.find((item) => item.code === input.serviceCode) ?? MAIN_SERVICES[1];

  const weightParse = parseWeightInput(input.weightInput);

  if (!weightParse.isValid || weightParse.value === null) {
    return {
      service,
      weightParse,
      actualWeight: null,
      billedWeight: null,
      isMinimumChargeApplied: false,
      mainCost: null,
      deliveryCost: null,
      fragranceCost: null,
      addOnCost: null,
      totalEstimate: null,
    };
  }

  const actualWeight = weightParse.value;
  const billedWeight = Math.max(STORE_INFO.minimumChargeKg, actualWeight);
  const isMinimumChargeApplied = actualWeight < STORE_INFO.minimumChargeKg;

  const deliveryAddon = ADD_ONS.find((item) => item.code === 'T01');
  const fragranceAddon = ADD_ONS.find((item) => item.code === 'T02');

  const mainCost = Math.round(billedWeight * service.pricePerKg);
  const deliveryCost = input.hasDelivery && deliveryAddon ? deliveryAddon.price : 0;
  const fragranceCost =
    input.hasPremiumFragrance && fragranceAddon
      ? Math.round(billedWeight * fragranceAddon.price)
      : 0;
  const addOnCost = deliveryCost + fragranceCost;
  const totalEstimate = mainCost + addOnCost;

  return {
    service,
    weightParse,
    actualWeight,
    billedWeight,
    isMinimumChargeApplied,
    mainCost,
    deliveryCost,
    fragranceCost,
    addOnCost,
    totalEstimate,
  };
}
