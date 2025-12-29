# Nelsen Store

Website toko online dengan fitur Dashboard, Transaksi, Chat Room, dan Pricelist. Dibangun menggunakan Next.js, TypeScript, Firebase, dan Supabase.

## 🚀 Fitur

- **Dashboard**: Profil pengguna, bagian unggulan, tombol kontak, grafik transaksi, dan ringkasan statistik
- **Transaksi**: Riwayat transaksi pengguna dengan status real-time
- **Chat Room**: Ruang obrolan untuk interaksi pengguna
- **Pricelist**: Daftar produk dengan fitur keranjang dan checkout
- **Authentication**: Login dengan Google dan GitHub
- **Dark/Light Theme**: Toggle tema gelap dan terang
- **Responsive Design**: Desain responsif untuk semua perangkat
- **Real-time Updates**: Pembaruan real-time menggunakan Supabase

## 🛠 Teknologi

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Firebase** - Authentication dan real-time database
- **Supabase** - PostgreSQL database dan real-time
- **NextAuth.js** - Authentication
- **Zustand** - State management
- **Framer Motion** - Animations
- **Chart.js** - Data visualization

## 📋 Prasyarat

- Node.js 18+
- npm atau yarn
- Akun Firebase
- Akun Supabase
- Domain (opsional untuk production)

## 🚀 Instalasi dan Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/nelsen-store.git
cd nelsen-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` ke `.env.local`:

```bash
cp .env.example .env.local
```

Isi variabel environment yang diperlukan:

#### Firebase Setup
1. Buat project di [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication dengan Google dan GitHub providers
3. Dapatkan konfigurasi Firebase
4. Isi variabel `NEXT_PUBLIC_FIREBASE_*`

#### Supabase Setup
1. Buat project di [Supabase](https://supabase.com/)
2. Buat database tables menggunakan SQL di `attachment.sql`
3. Enable Row Level Security (RLS)
4. Setup Authentication providers
5. Dapatkan URL dan API keys
6. Isi variabel `NEXT_PUBLIC_SUPABASE_*` dan `SUPABASE_SERVICE_ROLE_KEY`

#### NextAuth Setup
1. Generate secret: `openssl rand -base64 32`
2. Isi `NEXTAUTH_SECRET`
3. Setup OAuth providers di NextAuth configuration

#### Domain Setup (Production)
- Isi `DOMAIN` dengan domain production
- Update domain di Firebase dan Supabase

### 4. Setup Database

Jalankan SQL queries di `attachment.sql` di Supabase SQL Editor untuk membuat tables dan policies.

### 5. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Project

```
nelsen-store/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── transaksi/         # Transaksi page
│   ├── chat/              # Chat room page
│   ├── pricelist/         # Pricelist page
│   └── login/             # Login page
├── common/                # Shared components dan utilities
├── modules/               # Feature modules
├── messages/              # Internationalization
├── public/                # Static assets
├── attachment.sql         # Database schema
└── .env.example          # Environment variables template
```

## 🔧 Build dan Deploy

### Build untuk Production

```bash
npm run build
npm start
```

### Deploy ke Vercel

1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

### Deploy ke Netlify

1. Build command: `npm run build`
2. Publish directory: `out`
3. Set environment variables di Netlify dashboard

## 📊 Database Schema

### Tables

- **products**: Informasi produk (nama, harga, stok, dll)
- **transactions**: Riwayat transaksi pengguna
- **cart**: Keranjang belanja pengguna
- **testimonials**: Testimoni dan ulasan produk

### Real-time Features

- Live updates untuk chat messages
- Real-time transaction status
- Live cart updates
- Real-time product stock

## 🔐 Authentication

- Login dengan Google OAuth
- Login dengan GitHub OAuth
- Session management dengan NextAuth.js
- Protected routes untuk authenticated users

## 🎨 Customization

### Tema dan Styling

- Menggunakan Tailwind CSS untuk styling
- Dark/Light theme dengan next-themes
- Responsive design dengan Tailwind breakpoints

### Internationalization

- Support Bahasa Indonesia dan English
- Menggunakan next-intl untuk i18n

## 📝 API Routes

- `/api/auth/*`: NextAuth.js routes
- `/api/products`: CRUD operations untuk products
- `/api/transactions`: Transaction management
- `/api/chat`: Chat functionality
- `/api/upload`: File upload ke Supabase Storage

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Auth Error**: Pastikan konfigurasi Firebase sudah benar
2. **Supabase Connection Error**: Check API keys dan database connection
3. **Build Error**: Pastikan semua dependencies terinstall
4. **Environment Variables**: Pastikan semua required env vars sudah diisi

### Debug Mode

Set `NODE_ENV=development` untuk melihat error logs.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

Untuk pertanyaan atau dukungan, silakan buat issue di GitHub repository ini.

---

Dibuat dengan ❤️ oleh Nelsen Chandra
