# Profil Neo Telemetri 2026 - Backend

Backend API untuk platform Profil Neo Telemetri 2026, dibangun menggunakan Node.js, Express, dan TypeScript dengan Prisma ORM.

## 🚀 Fitur Utama

- **Katalog Proyek (Marketing):** Endpoint publik untuk melihat daftar dan detail proyek, serta manajemen CRUD untuk admin.
- **Berita & Pengumuman (PR):** Sistem manajemen berita lengkap untuk divisi Public Relations.
- **Autentikasi:** Sistem login admin menggunakan JWT (JSON Web Token) dan enkripsi `bcryptjs`.
- **Upload Gambar:** Integrasi `multer` dan `Cloudinary` untuk penyimpanan aset media secara cloud.
- **Validasi Data:** Validasi input yang ketat di setiap endpoint menggunakan `zod`.
- **Dokumentasi API:** Terintegrasi dengan Swagger UI untuk eksplorasi endpoint yang interaktif.
- **Automated Testing:** Unit test dan E2E test menggunakan Jest dan Supertest.

## 🛠️ Tech Stack

- **Runtime:** Node.js (v20+)
- **Framework:** Express.js (v5)
- **Bahasa:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Storage:** Cloudinary
- **Auth:** JWT & BcryptJS
- **Validasi:** Zod
- **API Docs:** Swagger / OpenAPI 3.0
- **Testing:** Jest & Supertest

## 📖 Cara Menjalankan

### 1. Persiapan Environment
Salin file `.env.example` menjadi `.env` dan isi variabel yang diperlukan:
```bash
cp .env.example .env
```

### 2. Instalasi Dependensi
```bash
pnpm install
```

### 3. Setup Database
Jalankan migrasi prisma:
```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Menjalankan Aplikasi
Mode Pengembangan:
```bash
pnpm dev
```
Mode Produksi:
```bash
pnpm build
pnpm start
```

## 📚 Dokumentasi API

Setelah aplikasi berjalan, buka dokumentasi interaktif Swagger di:
`http://localhost:3000/api-docs`

Dokumentasi ini mencakup semua endpoint untuk Marketing, PR, dan Publik.

---
Managed by Neo Telemetri Team.
