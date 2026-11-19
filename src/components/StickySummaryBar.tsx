// Menampilkan bar ringkasan estimasi biaya langsung dan tombol aksi Kirim ke WhatsApp yang menempel di bawah layar (FT-04 & FT-06).

import { MessageCircle } from 'lucide-react';
import type { MouseEvent } from 'react';
import type { EstimateResult } from '../lib/calculator';
import { formatRupiah } from '../lib/format';

interface StickySummaryBarProps {
  estimate: EstimateResult;
  whatsAppUrl: string;
  onAttemptSubmit: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function StickySummaryBar({
  estimate,
  whatsAppUrl,
  onAttemptSubmit,
}: StickySummaryBarProps) {
  const mainCostText = estimate.mainCost !== null ? formatRupiah(estimate.mainCost) : '-';
  const addOnCostText = estimate.addOnCost !== null ? formatRupiah(estimate.addOnCost) : '-';
  const totalText = estimate.totalEstimate !== null ? formatRupiah(estimate.totalEstimate) : '-';

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 border-t border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <div className="flex items-center justify-between gap-4 sm:flex-1">
          <div className="space-y-0.5 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-neutral-600 tabular-nums">
              <span>Layanan Utama: {mainCostText}</span>
              <span aria-hidden="true">·</span>
              <span>Tambahan: {addOnCostText}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-neutral-600">Total Estimasi</span>
              <span className="text-2xl font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
                {totalText}
              </span>
            </div>
          </div>
        </div>

        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onAttemptSubmit}
          className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 active:scale-[0.99] transition-transform duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 whitespace-nowrap shrink-0"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Kirim ke WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
