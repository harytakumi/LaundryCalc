// Menyediakan fungsi pemformatan angka Rupiah dan bilangan desimal standar Indonesia.

/** Memformat bilangan bulat menjadi pemisah ribuan titik tanpa desimal (contoh: 18.000). */
export function formatNumberId(amount: number): string {
  const rounded = Math.round(amount);
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(rounded);
}

/** Memformat nominal uang ke format Rupiah konsisten dengan layar dan template WhatsApp (contoh: Rp 18.000). */
export function formatRupiah(amount: number): string {
  return `Rp ${formatNumberId(amount)}`;
}

/** Memformat angka desimal memakai koma tanpa nol berlebih di belakang (contoh: 4,5 dan 3). */
export function formatDecimal(value: number): string {
  const normalized = Math.round(value * 100) / 100;
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(normalized);
}
