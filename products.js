/* ============================================================
   FILE INI SATU-SATUNYA YANG PERLU KAMU EDIT.
   Ganti teks di antara tanda kutip "..." saja, jangan hapus
   tanda koma, kurung [ ] atau kurung kurawal { }.
   ============================================================ */

const TOKO = {
  nama: "Funcomida Official Store",
  slogan: "Aplikasi & produk digital karya sendiri, siap pakai.",
  whatsapp: "6281234567890",        // nomor WA format 62..., tanpa + dan spasi
  instagram: "https://instagram.com/funcomida",
  lykd: "https://lykd.id/funcomida" // halaman Lykd utama kamu
};

/* Banner promo (muncul di atas beranda & di menu Promo) */
const PROMO = [
  { judul: "Diskon Launching 30%", teks: "Berlaku sampai akhir bulan untuk semua aplikasi.", kode: "FUNLAUNCH", warna: "#E8590C" },
  { judul: "Paket Bundling Hemat", teks: "Beli 2 produk, gratis update 1 tahun.", kode: "BUNDLE2", warna: "#C2410C" }
];

/* Daftar produk.
   gambar : isi link gambar (boleh banyak). Kosongkan [] jika belum ada.
   video  : link YouTube atau file .mp4. Kosongkan "" jika tidak ada.
   hargaCoret : harga sebelum diskon. Isi 0 jika tidak diskon.
   linkBeli : tautan beli langsung (WA, Tokopedia, dll).
   linkLykd : tautan beli lewat Lykd. Kosongkan "" jika tidak ada. */
const PRODUK = [
  {
    id: "beresin",
    nama: "Beresin",
    kategori: "Aplikasi",
    emoji: "🗂️",
    badge: "Terlaris",
    harga: 49000,
    hargaCoret: 79000,
    gambar: [],
    video: "",
    ringkas: "Inbox terpadu untuk merapikan kegiatan dan notifikasi.",
    deskripsi: "Beresin mengumpulkan notifikasi dan kegiatanmu dalam satu inbox bergaya Gmail, lengkap dengan status kegiatan agar harimu lebih teratur.",
    fitur: ["Inbox terpadu", "Status kegiatan", "Tampilan bersih ala Gmail", "Update gratis"],
    linkBeli: "https://wa.me/6281234567890?text=Halo,%20saya%20mau%20beli%20Beresin",
    linkLykd: "https://lykd.id/funcomida"
  },
  {
    id: "maktabah-learn",
    nama: "Maktabah Learn",
    kategori: "Website",
    emoji: "📚",
    badge: "Baru",
    harga: 99000,
    hargaCoret: 0,
    gambar: [],
    video: "",
    ringkas: "Perpustakaan PDF Arab, catatan, kuis, dan AI tutor.",
    deskripsi: "Website belajar pribadi: simpan kitab PDF Arab, buat catatan, latihan kuis, dan tanya AI tutor dalam satu tempat.",
    fitur: ["Perpustakaan PDF Arab", "Catatan & kuis", "AI tutor", "Sinkron di semua perangkat"],
    linkBeli: "https://wa.me/6281234567890?text=Halo,%20saya%20mau%20beli%20Maktabah%20Learn",
    linkLykd: ""
  },
  {
    id: "tafsir-quran",
    nama: "Web Tafsir Quran",
    kategori: "Website",
    emoji: "🌙",
    badge: "",
    harga: 59000,
    hargaCoret: 75000,
    gambar: [],
    video: "",
    ringkas: "Tafsir, kalender Hijriyah, jadwal puasa dan sholat.",
    deskripsi: "Baca tafsir dengan tampilan modern, dilengkapi kalender Hijriyah/Masehi, jadwal puasa sunnah, dan jadwal sholat.",
    fitur: ["Kalender Hijriyah & Masehi", "Jadwal puasa sunnah", "Jadwal sholat", "Tampilan modern"],
    linkBeli: "https://wa.me/6281234567890?text=Halo,%20saya%20mau%20beli%20Web%20Tafsir",
    linkLykd: "https://lykd.id/funcomida"
  }
];
