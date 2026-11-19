// Menampilkan pilihan checkbox layanan tambahan Antar-Jemput dan Pewangi Premium secara interaktif (FT-03).

import { Check } from 'lucide-react';
import { ADD_ONS } from '../config';
import { formatRupiah } from '../lib/format';

interface AddOnOptionsProps {
  hasDelivery: boolean;
  hasPremiumFragrance: boolean;
  fragranceCost: number | null;
  onToggleDelivery: (checked: boolean) => void;
  onToggleFragrance: (checked: boolean) => void;
}

export function AddOnOptions({
  hasDelivery,
  hasPremiumFragrance,
  fragranceCost,
  onToggleDelivery,
  onToggleFragrance,
}: AddOnOptionsProps) {
  return (
    <section
      aria-labelledby="addons-heading"
      className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 space-y-3"
    >
      <h2 id="addons-heading" className="text-lg font-semibold text-neutral-900">
        Layanan tambahan (opsional)
      </h2>

      <div className="space-y-3">
        {ADD_ONS.map((addon) => {
          const isDelivery = addon.code === 'T01';
          const isChecked = isDelivery ? hasDelivery : hasPremiumFragrance;
          const handleChange = isDelivery ? onToggleDelivery : onToggleFragrance;

          return (
            <label
              key={addon.code}
              className={`flex items-start justify-between gap-3 rounded-xl border p-3.5 min-h-[44px] cursor-pointer transition-colors duration-150 ease-out motion-reduce:transition-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-700 ${
                isChecked
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => handleChange(e.target.checked)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    isChecked
                      ? 'border-blue-700 bg-blue-700 text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                </span>

                <div className="min-w-0 space-y-0.5">
                  <span className="block text-base font-medium text-neutral-900">
                    {addon.labelTitle}
                  </span>
                  <span className="block text-sm text-neutral-600">{addon.notes}</span>
                </div>
              </div>

              {!isDelivery && isChecked && fragranceCost !== null && (
                <span className="shrink-0 text-sm font-semibold text-blue-700 tabular-nums whitespace-nowrap">
                  +{formatRupiah(fragranceCost)}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </section>
  );
}
