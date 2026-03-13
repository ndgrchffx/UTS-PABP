# Apotikita - Sistem Inventaris Obat (UTS PABP)

Sistem Manajemen Inventaris Obat berbasis Web yang dibangun menggunakan **Next.js 14** (Frontend) dan **Laravel 11** (Backend). Proyek ini dibuat untuk memenuhi tugas UTS mata kuliah Pengembangan Aplikasi Berbasis Platform.

## Fitur Utama
* **Autentikasi JWT**: Login aman menggunakan JSON Web Token.
* **CRUD Obat**: Tambah, Lihat, Edit, dan Hapus data obat.
* **Statistik Dashboard**: Menampilkan total produk dan harga obat tertinggi secara dinamis.
* **Cetak Laporan PDF**: Export data inventaris ke format PDF menggunakan `jsPDF` & `autoTable`.
* **Refresh Token**: Memperbarui masa berlaku sesi login tanpa harus login ulang.
* **Pencarian Real-time**: Mencari obat berdasarkan nama atau kategori.
* **Responsive Design**: Tampilan modern dengan Tailwind CSS & Glassmorphism.

## Teknologi yang Digunakan
- **Frontend**: Next.js (TypeScript), Axios, SweetAlert2, jsPDF.
- **Backend**: Laravel (REST API), JWT-Auth (Tymon).
- **Database**: HeidiSQL.

## 🏁 Cara Menjalankan Proyek
### 1. Backend (Laravel)
```bash
cd backend
composer install
php artisan migrate
php artisan jwt:secret
php artisan serve

2. Frontend (Next.js)
cd frontend
npm install
npm run dev

Akses aplikasi di http://localhost:3000
