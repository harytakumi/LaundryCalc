// Menyusun pesan template pesanan WhatsApp sesuai format baku PRD dan menghasilkan tautan deep-link wa.me.

import { APP_CONFIG, STORE_INFO } from '../config';
import type { EstimateResult } from './calculator';
import { formatDecimal, formatNumberId } from './format';

export interface WhatsAppOrderPayload {
  customerName: string;
  hasDelivery: boolean;
  hasPremiumFragrance: boolean;
  pickupAddress: string;
  specialNotes: string;
  estimate: EstimateResult;
}

/** Menyusun teks pesan WhatsApp persis sesuai template PRD Bagian 7 dengan nilai identik di layar. */
export function buildWhatsAppMessage(payload: WhatsAppOrderPayload): string {
  const { estimate } = payload;
  const cleanName = payload.customerName.trim();
  const actualWeightText =
    estimate.actualWeight !== null ? formatDecimal(estimate.actualWeight) : '0';
  const billedWeightText =
    estimate.billedWeight !== null ? formatDecimal(estimate.billedWeight) : '0';

  const deliveryLine =
    payload.hasDelivery && estimate.deliveryCost !== null
      ? `Ya (+Rp ${formatNumberId(estimate.deliveryCost)})`
      : 'Tidak';

  const fragranceLine =
    payload.hasPremiumFragrance && estimate.fragranceCost !== null
      ? `Ya (+Rp ${formatNumberId(estimate.fragranceCost)})`
      : 'Tidak';

  const addressText = payload.hasDelivery
    ? payload.pickupAddress.trim()
    : APP_CONFIG.selfDropOffLabel;

  const trimmedNotes = payload.specialNotes.trim();
  const notesText = trimmedNotes === '' ? APP_CONFIG.emptyNotesFallback : trimmedNotes;

  const totalText =
    estimate.totalEstimate !== null ? formatNumberId(estimate.totalEstimate) : '0';

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${cleanName}`,
    `*Layanan Utama:* ${estimate.service.name}`,
    `*Estimasi Berat:* ${actualWeightText} kg (Berat Ditagih: ${billedWeightText} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${deliveryLine}`,
    `- Pewangi Premium: ${fragranceLine}`,
    '',
    `*Alamat Penjemputan:* ${addressText}`,
    `*Catatan Khusus:* ${notesText}`,
    '',
    `*Estimasi Total Biaya:* *Rp ${totalText}*`,
    '',
    '_(Catatan: Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry)._',
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

/** Menghasilkan tautan deep-link WhatsApp dengan encoding aman untuk karakter khusus. */
export function buildWhatsAppUrl(payload: WhatsAppOrderPayload): string {
  const message = buildWhatsAppMessage(payload);
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
