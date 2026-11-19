// Menyediakan validasi formulir pesanan (berat, nama pemesan, dan alamat kondisional) sesuai BL-03.

import { parseWeightInput } from './calculator';

export interface OrderFormFields {
  weightInput: string;
  hasDelivery: boolean;
  customerName: string;
  pickupAddress: string;
}

export type OrderErrorField = 'weight' | 'customerName' | 'pickupAddress';

export type OrderFormErrors = Partial<Record<OrderErrorField, string>>;

export interface ValidationResult {
  isValid: boolean;
  errors: OrderFormErrors;
  firstErrorField: OrderErrorField | null;
}

/** Memeriksa seluruh kolom wajib formulir dan mengembalikan pesan error serta kolom fokus pertama. */
export function validateOrderForm(fields: OrderFormFields): ValidationResult {
  const errors: OrderFormErrors = {};

  const weightCheck = parseWeightInput(fields.weightInput);
  if (!weightCheck.isValid) {
    errors.weight = 'Masukkan perkiraan berat cucian minimal 0,1 kg, contoh: 3,5.';
  }

  if (fields.customerName.trim() === '') {
    errors.customerName = 'Masukkan nama kamu agar admin bisa mencatat pesanan, contoh: Budi Santoso.';
  }

  if (fields.hasDelivery && fields.pickupAddress.trim() === '') {
    errors.pickupAddress =
      'Masukkan alamat penjemputan lengkap karena layanan Antar-Jemput dipilih, contoh: Jl. Melati No. 12, RT 02.';
  }

  const orderedFields: OrderErrorField[] = ['weight', 'customerName', 'pickupAddress'];
  const firstErrorField = orderedFields.find((field) => Boolean(errors[field])) ?? null;

  return {
    isValid: firstErrorField === null,
    errors,
    firstErrorField,
  };
}
