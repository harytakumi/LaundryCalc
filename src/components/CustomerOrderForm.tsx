// Menyediakan formulir data pemesan meliputi nama wajib, alamat jemput kondisional, catatan opsional, dan klausul estimasi (FT-05).

import { AlertCircle } from 'lucide-react';
import type { RefObject } from 'react';
import { APP_CONFIG } from '../config';
import type { OrderFormErrors } from '../lib/validation';

interface CustomerOrderFormProps {
  customerName: string;
  pickupAddress: string;
  specialNotes: string;
  hasDelivery: boolean;
  errors: OrderFormErrors;
  customerNameRef: RefObject<HTMLInputElement | null>;
  pickupAddressRef: RefObject<HTMLTextAreaElement | null>;
  onChangeName: (value: string) => void;
  onChangeAddress: (value: string) => void;
  onChangeNotes: (value: string) => void;
}

export function CustomerOrderForm({
  customerName,
  pickupAddress,
  specialNotes,
  hasDelivery,
  errors,
  customerNameRef,
  pickupAddressRef,
  onChangeName,
  onChangeAddress,
  onChangeNotes,
}: CustomerOrderFormProps) {
  return (
    <section
      aria-labelledby="customer-form-heading"
      className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 space-y-4"
    >
      <h2 id="customer-form-heading" className="text-lg font-semibold text-neutral-900">
        Data pemesan
      </h2>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="customer-name" className="block text-sm font-medium text-neutral-900">
            Nama pemesan
          </label>
          <input
            ref={customerNameRef}
            id="customer-name"
            name="customerName"
            type="text"
            autoComplete="name"
            value={customerName}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="Contoh: Budi Santoso"
            aria-required="true"
            aria-invalid={Boolean(errors.customerName)}
            aria-describedby={errors.customerName ? 'customer-name-error' : undefined}
            className={`w-full min-h-[44px] rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              errors.customerName ? 'border-red-700' : 'border-neutral-200'
            }`}
          />
          {errors.customerName && (
            <div
              id="customer-name-error"
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errors.customerName}</span>
            </div>
          )}
        </div>

        {hasDelivery ? (
          <div className="space-y-1.5">
            <label htmlFor="pickup-address" className="block text-sm font-medium text-neutral-900">
              Alamat penjemputan
            </label>
            <textarea
              ref={pickupAddressRef}
              id="pickup-address"
              name="pickupAddress"
              autoComplete="street-address"
              rows={3}
              value={pickupAddress}
              onChange={(e) => onChangeAddress(e.target.value)}
              placeholder="Contoh: Jl. Melati No. 12, RT 02"
              aria-required="true"
              aria-invalid={Boolean(errors.pickupAddress)}
              aria-describedby={errors.pickupAddress ? 'pickup-address-error' : undefined}
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                errors.pickupAddress ? 'border-red-700' : 'border-neutral-200'
              }`}
            />
            {errors.pickupAddress && (
              <div
                id="pickup-address-error"
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errors.pickupAddress}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-neutral-600">
            Pengantaran: <span className="font-medium text-neutral-900">Antar sendiri ke toko.</span>
          </p>
        )}

        <div className="space-y-1.5">
          <label htmlFor="special-notes" className="block text-sm font-medium text-neutral-900">
            Catatan khusus (opsional)
          </label>
          <textarea
            id="special-notes"
            name="specialNotes"
            rows={2}
            value={specialNotes}
            onChange={(e) => onChangeNotes(e.target.value)}
            placeholder="Contoh: Pisahkan baju putih dan pakaian berbahan sutra"
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
        </div>
      </div>

      <p className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-600 leading-snug">
        {APP_CONFIG.estimationDisclaimer}
      </p>
    </section>
  );
}
