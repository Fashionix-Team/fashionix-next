# Fashionix Next

<p align="center">
  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80" alt="Fashionix storefront preview" width="720">
</p>

<p align="center">
  <b>Fashionix</b> &#x1F6CD; menghadirkan pengalaman belanja fashion kelas butik dengan kecepatan dan fleksibilitas headless commerce modern.
</p>

## &#x1F31F; Pengenalan Fashionix

Fashionix adalah ekosistem e-commerce yang dirancang untuk brand fashion digital-first. Dengan arsitektur headless berbasis Next.js, Fashionix memisahkan front-end dan back-end agar tim kreatif dan pengembang dapat meluncurkan kampanye, katalog, serta personalisasi pengalaman pelanggan dengan gesit. Fokus kami adalah tampilan premium, checkout cepat, dan konten dinamis yang tetap aman serta mudah dirawat.

- Navigasi koleksi yang kaya visual guna memikat pelanggan sejak halaman pertama.
- Pengelolaan produk, stok, dan promosi melalui integrasi GraphQL yang konsisten.
- Analitik real-time untuk memahami performa kampanye fashion secara mendalam.

![Fashionix multi device preview](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80)

## &#x1F9F0; Teknologi yang Digunakan

- Next.js 15 dengan mode App Router dan Turbopack untuk rendering super cepat.
- React 18 yang memanfaatkan Suspense dan Server Components demi pengalaman interaktif halus.
- HeroUI dan Tailwind CSS 4 untuk sistem desain yang elegan dan responsif.
- TanStack Query serta GraphQL Request untuk pengambilan data yang tangguh dan tersinkron.
- Redux Toolkit untuk state management lintas halaman, termasuk keranjang dan preferensi pelanggan.
- PNPM sebagai package manager ringan yang efisien untuk monorepo dan workspace tim.

## &#x1F680; Cara Pakai Fashionix

### &#x2705; System Requirements

- Node.js 18 atau lebih baru
- pnpm 8 atau lebih baru

### &#x1F4E6; Clone dan Install

```bash
git clone https://github.com/your-org/fashionix-next.git
cd fashionix-next
pnpm install
```

> Ganti `your-org` dengan organisasi atau akun GitHub kamu.

### &#x1F510; Setup Environment

```bash
cp .env.example .env.local
```

Isi variabel berikut agar koneksi ke layanan Fashionix berjalan mulus:

| Variabel | Keterangan |
| --- | --- |
| `NEXTAUTH_URL` | URL aplikasi Fashionix (mis. `http://localhost:3000`) |
| `IMAGE_DOMAIN` | Domain CDN atau host gambar produk |
| `BAGISTO_STORE_DOMAIN` | Endpoint backend Bagisto atau API katalog Fashionix |
| `BAGISTO_SESSION` | Session token untuk autentikasi layanan katalog |
| `COMPANY_NAME` | Nama perusahaan atau brand utama |
| `SITE_NAME` | Nama tampilan storefront Fashionix |
| `TWITTER_CREATOR` | Handle Twitter akun kreator konten |
| `TWITTER_SITE` | Handle Twitter brand Fashionix |
| `REVALIDATION_DURATION` | Durasi revalidasi ISR dalam detik |
| `NEXTAUTH_SECRET` | Secret NextAuth (gunakan `openssl rand -base64 32`) |
| `NEXT_PUBLIC_API_URL` | URL API publik untuk data storefront |
| `NEXT_PUBLIC_SITE_NAME` | Nama yang muncul di metadata publik |

### &#x1F9EA; Jalankan Mode Pengembangan

```bash
pnpm dev
```

Buka `http://localhost:3000` lalu jelajahi pengalaman katalog dan checkout real-time.

### &#x1F3D7; Build untuk Production

```bash
pnpm build
```

### &#x1F6A2; Start Server Production

```bash
pnpm start
```

Tambahan opsional untuk menjaga kualitas sebelum rilis:

```bash
pnpm lint
```

Selamat berkreasi dengan Fashionix! &#x1F389;
