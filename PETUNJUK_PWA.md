# Sales Shift — PWA (Progressive Web App)

Dashboard penjualan shift **Data 1 (Produk)** dan **Data 2 (RPM)** yang dapat dipasang pada Android, iPhone, maupun komputer. Seluruh rumus, input, halaman, dan 4 tema dari versi sebelumnya dipertahankan.

## Cara menerbitkan / install

**Penting:** PWA hanya bisa terpasang melalui website **HTTPS** atau **localhost**. Membuka file `index.html` dengan klik dua kali (alamat `file://`) tidak dapat mengaktifkan service worker dan instalasi PWA.

### Cara termudah: unggah ke Netlify Drop / hosting statis HTTPS

1. Ekstrak ZIP ini sampai terlihat `index.html`, `manifest.webmanifest`, `service-worker.js`, folder `icons` dan `screenshots`.
2. Di layanan hosting statis pilihan Anda yang mendukung HTTPS (misalnya Netlify Drop), unggah **folder `Sales_Shift_PWA`** beserta semua isinya. Jangan hanya `index.html`.
3. Buka alamat HTTPS yang diberikan di browser HP.
4. **Android (Chrome):** pilih tombol **Pasang App** pada dashboard jika instalasi tersedia, atau menu ⋮ → **Instal aplikasi** / **Tambahkan ke layar utama**.
5. **iPhone (Safari):** tekan tombol Bagikan → **Tambahkan ke Layar Utama**.
6. Setelah terpasang dan sekali diakses saat online, dashboard bisa dibuka tanpa internet.

### Uji di komputer (localhost)

Jika Python terinstal, buka terminal di dalam folder hasil ekstrak:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000/` di Chrome, Edge, atau Safari. Gunakan Chrome DevTools → Application untuk memeriksa Manifest / Service Workers / Cache Storage. Di luar localhost gunakan HTTPS.

## Data tidak otomatis berpindah

- Laporan dan tema tersimpan **hanya di browser/perangkat** menggunakan `localStorage`. Tidak ada server database, akun, atau sinkronisasi antar perangkat.
- **Penting sebelum beralih dari file HTML lama:** klik **Backup JSON** pada dashboard lama. Di PWA, pilih **Impor JSON** untuk memindahkan semua data. Ini penting karena origin/alamat aplikasi berbeda.
- Jangan hapus data situs tanpa memiliki backup. Menghapus data aplikasi dapat menghapus input yang tersimpan.
- Perhitungan Produk: **Shift 2 = Total Penjualan Harian − Shift 1**. Nama produk dan total harian dapat diedit. Target RPM mengikuti panel Target RPM.
- Aplikasi offline setelah pemasangan cache selesai. Memuat alamat pertama kali tetap membutuhkan internet.
- Pembaruan versi PWA tidak secara otomatis mengganti laporan yang sudah tersimpan; gunakan Backup JSON sebelum mengubah konten besar.

## Isi folder

- `index.html`: dashboard lengkap, Data 1, Data 2, pilihan 4 tema, dan tombol Pasang App.
- `manifest.webmanifest`: metadata instalasi PWA.
- `service-worker.js`: penyimpanan halaman untuk akses offline.
- `icons/`: ikon aplikasi, termasuk ikon Android maskable.
- `screenshots/`: pratinjau pemasangan aplikasi.

**Catatan:** Ini adalah **PWA web yang dapat dipasang**, bukan berkas APK Play Store. PWA dapat diinstal dari browser setelah diterbitkan melalui HTTPS; paket ZIP ini belum dihosting ke internet.
