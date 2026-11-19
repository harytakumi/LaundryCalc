# Daftar Fitur LaundryCalc

Sumber acuan: Product Requirements Document — LaundryCalc & Catalog (v1.1, 3 November 2026).

| Kode | Nama Fitur | Prioritas | Ketergantungan | Aturan Bisnis | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have | Tidak ada | - | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have | FT-01 | BL-01 | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have | FT-01, FT-02 | BL-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have | FT-01, FT-02, FT-03 | BL-01, BL-02 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 | BL-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have | FT-01, FT-02, FT-03, FT-04, FT-05 | BL-03 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have | Tidak ada | - | Ditunda |

## Keputusan Klarifikasi PRD

1. **Cakupan implementasi**: Dikerjakan sampai fitur **FT-06** sesuai permintaan pengguna. Fitur **FT-07** ditunda ke tahap berikutnya.
2. **Nilai awal kolom berat (FT-02)**: Kolom berat otomatis terisi `3` kg saat halaman dibuka agar pengguna langsung melihat simulasi estimasi awal, namun tetap menolak angka `0`, negatif, atau kolom kosong saat pengiriman.
3. **Format angka dan mata uang**: Angka Rupiah memakai pemisah ribuan titik tanpa desimal (`Rp 18.000`) agar seragam antara layar dan template pesan WhatsApp di PRD Bagian 7. Desimal berat memakai koma (`4,5`), sedangkan kolom input menerima koma maupun titik.
4. **Nomor WhatsApp toko**: Memakai nomor `6281225141374` (dari `081225141374`) di `src/config.ts` (`STORE_INFO.whatsappNumber`).
