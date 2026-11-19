// Menyediakan kolom input berat cucian dengan tombol step 0,1 kg serta notifikasi minimum charge 3 kg (FT-02).

import { AlertCircle, Info, Minus, Plus } from 'lucide-react';
import type { RefObject } from 'react';
import { APP_CONFIG } from '../config';
import { stepWeightValue } from '../lib/calculator';
import { formatDecimal } from '../lib/format';

interface WeightInputProps {
  value: string;
  billedWeight: number | null;
  isMinimumChargeApplied: boolean;
  error?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (nextValue: string) => void;
}

export function WeightInput({
  value,
  billedWeight,
  isMinimumChargeApplied,
  error,
  inputRef,
  onChange,
}: WeightInputProps) {
  const handleStep = (delta: number) => {
    const next = stepWeightValue(value, delta);
    onChange(formatDecimal(next));
  };

  return (
    <section
      aria-labelledby="weight-section-heading"
      className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 space-y-4"
    >
      <div className="space-y-1">
        <label
          id="weight-section-heading"
          htmlFor="weight-input"
          className="block text-lg font-semibold text-neutral-900"
        >
          Perkiraan berat cucian (kg)
        </label>
        <p className="text-sm text-neutral-600">Minimal tagihan 3 kg untuk semua paket.</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleStep(-APP_CONFIG.weightStepKg)}
          aria-label="Kurangi berat 0,1 kg"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 active:scale-[0.98] transition-transform duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="relative flex-1">
          <input
            ref={inputRef}
            id="weight-input"
            name="weight"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Contoh: 3,5"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'weight-error' : 'weight-billed-info'}
            className={`w-full h-11 rounded-xl border bg-white px-4 pr-12 text-base font-medium text-neutral-900 placeholder:text-neutral-500 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              error ? 'border-red-700' : 'border-neutral-200'
            }`}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-600"
          >
            kg
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleStep(APP_CONFIG.weightStepKg)}
          aria-label="Tambah berat 0,1 kg"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 active:scale-[0.98] transition-transform duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {billedWeight !== null && (
        <p id="weight-billed-info" className="text-sm text-neutral-600 tabular-nums">
          Berat ditagih: <span className="font-semibold text-neutral-900">{formatDecimal(billedWeight)} kg</span>
        </p>
      )}

      {isMinimumChargeApplied && (
        <div
          role="status"
          className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Berat di bawah 3 kg tetap dihitung 3 kg (ketentuan minimum charge).</span>
        </div>
      )}

      {error && (
        <div
          id="weight-error"
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </section>
  );
}
