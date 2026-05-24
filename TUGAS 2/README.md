## **Tugas Praktik 2 Pemrograman Berbasis Web – Catatan Pengerjaan**

### **Struktur Project**

```
Tugas.2/
├── css/
│   └── style.css # Gaya CSS
├── js/
│   ├── dataBahanAjar.js # Data bahan ajar
│   ├── stok-app.js # Stok bahan ajar dengan Vue
│   └── tracking-app.js # Tracking delivery order dengan Vue
├── index.html # Halaman utama
├── stok.html # Halaman stok
└── tracking.html # Halaman pencarian DO
```

---

### **Halaman Utama (index.html)**

Berisi dua tombol navigasi ke:

- **Stok Bahan Ajar**
- **Tracking Delivery Order**

Sebagai halaman pembuka untuk akses ke dua fitur utama aplikasi.

---

### **Halaman Stok Bahan Ajar (stok.html)**

Menampilkan daftar stok bahan ajar dari `dataBahanAjar.js` dalam tabel interaktif berisi kode, judul, kategori, upbjj, lokasi rak, stok, safety, harga, status, dan catatan.

**Status Stok:**

- **Aman** (hijau) jika stok ≥ safety
- **Menipis** (oranye) jika stok < safety
- **Kosong** (merah) jika stok = 0

**Filter & Sort:**

- Filter berdasarkan **UPBJJ**, **Kategori**, dan kondisi stok.
- Sortir data berdasarkan **Judul**, **Stok**, atau **Harga**.
- Filter kategori baru muncul setelah UPBJJ dipilih (dependent filter).
- Tombol **Reset Filter** untuk mengembalikan tampilan awal.

**Form Tambah/Edit (Modal):**

- Form muncul dalam modal box.
- **Tambah Data** membuka form kosong.
- **Edit** membuka form berisi data lama.
- Validasi input untuk kolom wajib.
- Data langsung diperbarui tanpa reload.

**Watcher:**

- Memantau perubahan filter UPBJJ dan kategori agar data otomatis berubah.
- Digunakan juga untuk mendeteksi stok rendah.

---

### **Halaman Tracking Delivery Order (tracking.html)**

Form input DO terdiri dari:
Nomor DO otomatis, NIM, Nama, Ekspedisi, Paket, Tanggal Kirim, dan Total Harga.
Nomor DO digenerate otomatis (misal: DO2025-001, DO2025-002, dst).

**Fitur Utama:**

- Setelah memilih paket, otomatis muncul detail isi dan total harga.
- Validasi input untuk mencegah data kosong.
- Data DO baru langsung muncul di tabel bawah form.

**Watcher:**

- Memantau perubahan paket dan ekspedisi.
- Memperbarui detail dan total harga secara otomatis.

---

### **Desain (style.css)**

- Semua gaya ditulis di `style.css`.
- Semua warna dibuatkan Variable CSS.
- Warna:
  - Primary: #0066cc (biru)
  - Secondary: #ffcc00 (kuning)
  - Accent: #ff7b00 (oranye)
  - Text: #333333 (hitam abu)
  - Text Muted: #666666 (abu sedang)
  - Background: #f8f9fa (putih abu muda)
  - Border: #e0e0e0 (abu netral)
- Gunakan **Flexbox/Grid** untuk layout.
- **Modal form** dengan overlay transparan.
- Status stok diberi warna jelas (hijau/oranye/merah).
- Efek hover dan transisi halus pada tombol/tabel.
- Semua icon menggunakan **Font Awesome**.
- Alert menggunakan **Sweet Alert**

---

### **Interaktivitas (Vue.js)**

- Menggunakan **v-for**, **v-if**, **v-bind**, dan **v-model** untuk binding dan kondisi.
- **Computed property** untuk filter, sort, dan nomor DO otomatis.
- **Watcher** untuk memantau perubahan data.
- Semua fitur berjalan real-time tanpa reload.
