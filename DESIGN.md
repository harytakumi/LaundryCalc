# Keputusan Desain LaundryCalc

## Pilihan Desain Pengguna

| Aspek | Keputusan | Keterangan |
| :--- | :--- | :--- |
| Nama aplikasi | LaundryCalc | Sesuai PRD v1.1 |
| Pengguna utama | Pelanggan rumahan/kost & Admin Toko Laundry | Tanpa login atau akun |
| Kesan visual | Formal dan tenang | Jenis huruf IBM Plex Sans (400, 500, 600) |
| Warna aksen | Biru | `blue-700` untuk tombol utama dan elemen terpilih |
| Sapaan pengguna | Kamu | Bahasa Indonesia sesuai EYD V |
| Susunan halaman | Satu halaman bergulir responsif | Satu kolom di layar ponsel (`>= 360px`), dua kolom di layar desktop |
| Posisi ringkasan & aksi utama | Bar menempel di bawah layar | Menampilkan rincian biaya langsung dan tombol kirim WhatsApp |
| Gambar | Tanpa gambar | Fokus pada kejelasan katalog, input, dan angka estimasi |

## Token Visual

| Peran | Nilai / Kelas Tailwind |
| :--- | :--- |
| Latar halaman | `bg-neutral-50` |
| Permukaan kartu & panel | `bg-white` |
| Garis pemisah & input | `border-neutral-200` |
| Teks utama | `text-neutral-900` |
| Teks pendukung | `text-neutral-600` |
| Placeholder | `text-neutral-500` |
| Tombol utama | `bg-blue-700 hover:bg-blue-800 text-white` |
| Penanda terpilih | `border-blue-700 bg-blue-50` |
| Cincin fokus | `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700` |
| Peringatan minimum charge | `bg-amber-50 text-amber-800 border-amber-200` |
| Pesan error validasi | `bg-red-50 text-red-800 border-red-200` |
| Sudut komponen | Kartu/panel `rounded-2xl`, input/tombol `rounded-xl` |
| Bayangan bar melayang | `shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]` |
| Huruf | `@fontsource/ibm-plex-sans` (400, 500, 600), angka memakai `tabular-nums` |
