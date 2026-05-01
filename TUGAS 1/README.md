# Tugas Praktik 1 Pemrograman Berbasis Web – Catatan Pengerjaan

## Struktur Project

```
Tugas.1/
├── css/
│   └── style.css   # Gaya CSS
├── js/
│   ├── main.js   # Interaksi JavaScript
│   └── data.js   # Data dummy
├── img/           # Gambar
├── index.html  # Halaman utama (login)
├── dashboard.html  # Halaman dashboard
├── tracking.html   # Halaman pencarian DO
└── stok.html   # Halaman stok
```

## Login Page (index.html)

- Form terdiri dari input email dan password.
- Tombol **Login** untuk validasi data pengguna dari `data.js`.
- Jika data tidak sesuai, muncul alert pesan kesalahan.
- Tombol **Lupa Password** dan **Daftar** menggunakan modal box (pop-up).
- Jika login berhasil, diarahkan ke `dashboard.html`.

## Dashboard Page (dashboard.html)

- Menampilkan navigasi utama:
  - Informasi Bahan Ajar -> `stok.html`
  - Tracking Pengiriman -> `tracking.html`
  - Laporan -> `#`
  - Histori Transaksi -> `#`
- Greeting otomatis berdasarkan waktu lokal (pagi/siang/sore).
- Tombol **Logout** untuk kembali ke halaman login.
- Gambar yang bergerak sebagai latar belakang halaman.
- Navigasi diarahkan ke halaman sesuai tombol yang diklik.

## Tracking Page (tracking.html)

- Input: Nomor Delivery Order (DO).
- Tombol **Cari** untuk menampilkan data dari `data.js`.
- Hasil pencarian menampilkan:
  - Nama Mahasiswa
  - Status Pengiriman (bisa progress bar)
  - Detail ekspedisi, tanggal kirim, jenis paket, total pembayaran.
- Jika data tidak ditemukan, tampil alert.

## Stok Page (stok.html)

- Menampilkan data stok bahan ajar dari variabel `dataBahanAjar` di `data.js`.
- Tabel dibuat dinamis dengan JavaScript DOM.
- Terdapat tombol **Tambah Data** untuk menambah baris stok baru.

## Desain (CSS)

- Semua gaya ditulis di `style.css`.
- Warna utama disesuaikan dengan tema Universitas Terbuka (biru dan oranye).
- Layout menggunakan Flexbox / Grid.
- Efek interaktif: hover, modal animasi, dan progress bar.

## Interaksi (JavaScript)

- File `main.js` berisi:
  - Validasi form login.
  - Greeting waktu di dashboard.
  - Fungsi pencarian DO.
  - Manipulasi tabel stok (tambah baris).
- File `data.js` berisi data dummy:
  - Data pengguna.
  - Data bahan ajar.
  - Data pengiriman DO.

