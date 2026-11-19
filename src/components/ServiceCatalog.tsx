// Menampilkan pilihan kartu paket layanan utama laundry lengkap dengan tarif dan durasi (FT-01).

import { Check } from 'lucide-react';
import { MAIN_SERVICES, type ServiceCode } from '../config';
import { formatRupiah } from '../lib/format';

interface ServiceCatalogProps {
  selectedCode: ServiceCode;
  onSelect: (code: ServiceCode) => void;
}

export function ServiceCatalog({ selectedCode, onSelect }: ServiceCatalogProps) {
  return (
    <section aria-labelledby="service-catalog-heading" className="space-y-3">
      <h2 id="service-catalog-heading" className="text-lg font-semibold text-neutral-900">
        Pilih layanan utama
      </h2>

      <div role="radiogroup" aria-labelledby="service-catalog-heading" className="space-y-3">
        {MAIN_SERVICES.map((service) => {
          const isSelected = service.code === selectedCode;

          return (
            <button
              key={service.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(service.code)}
              className={`w-full text-left rounded-2xl p-4 min-h-[44px] border transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                isSelected
                  ? 'bg-blue-50 border-blue-700 ring-1 ring-blue-700'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      isSelected
                        ? 'border-blue-700 bg-blue-700 text-white'
                        : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                  </span>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-base font-semibold text-neutral-900">
                        {service.name}
                      </span>
                      <span aria-hidden="true" className="text-neutral-400 text-sm">
                        ·
                      </span>
                      <span className="text-sm text-neutral-600">
                        Estimasi {service.durationDays} hari
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-snug">{service.description}</p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-base font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
                    {formatRupiah(service.pricePerKg)}
                  </span>
                  <span className="block text-sm text-neutral-600 whitespace-nowrap">/kg</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
