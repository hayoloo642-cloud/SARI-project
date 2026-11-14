// =========================================
// SARI - Generate: SQLite -> assets/js/data.js
// Jalankan:  node database/generate.js
// Dipanggil otomatis oleh server.js setiap ada perubahan data.
// =========================================
// Hasil data.js berbentuk sama seperti versi manual sehingga
// app.js tidak perlu diubah, plus tambahan: galeri[] (multi-foto).
// =========================================

'use strict';

const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const ROOT = path.join(__dirname, '..');
const DB_PATH = path.join(__dirname, 'sari.db');
const OUT = path.join(ROOT, 'assets', 'js', 'data.js');

if (!fs.existsSync(DB_PATH)) {
  console.error('[generate] Database belum ada. Jalankan: node database/seed.js');
  process.exit(1);
}

const db = new DatabaseSync(DB_PATH, { readOnly: true });
db.exec('PRAGMA foreign_keys = ON;');

// ---------- Ambil data ----------
const wilayahRows = db.prepare('SELECT * FROM wilayah ORDER BY id').all();

const destinasiRows = db.prepare(`
  SELECT d.*, w.slug AS wilayah_slug
  FROM destinasi d JOIN wilayah w ON w.id = d.wilayah_id
  WHERE d.status = 'aktif'
  ORDER BY d.id
`).all();

const detailStmt = db.prepare(
  'SELECT paragraf FROM destinasi_detail WHERE destinasi_id = ? ORDER BY urutan'
);
const highlightStmt = db.prepare(
  'SELECT teks FROM destinasi_highlight WHERE destinasi_id = ? ORDER BY urutan'
);
const aktivitasStmt = db.prepare(`
  SELECT a.nama FROM destinasi_aktivitas da
  JOIN aktivitas a ON a.id = da.aktivitas_id
  WHERE da.destinasi_id = ? ORDER BY a.nama
`);
const budayaStmt = db.prepare(`
  SELECT b.slug FROM destinasi_budaya db2
  JOIN budaya b ON b.id = db2.budaya_id
  WHERE db2.destinasi_id = ? ORDER BY b.id
`);
const galeriStmt = db.prepare(`
  SELECT path, alt FROM destinasi_gambar
  WHERE destinasi_id = ? AND is_utama = 0
  ORDER BY id
`);
const ratingStmt = db.prepare(`
  SELECT AVG(rating) AS rata, COUNT(*) AS jumlah
  FROM ulasan
  WHERE destinasi_id = ? AND status = 'disetujui'
`);
const ulasanStmt = db.prepare(`
  SELECT id, nama_pengunjung, rating, komentar, created_at
  FROM ulasan
  WHERE destinasi_id = ? AND status = 'disetujui'
  ORDER BY created_at DESC
`);

// ---------- Susun struktur data.js ----------
const WILAYAH = wilayahRows.map((w) => ({
  id: w.slug,
  nama: w.nama,
  deskripsi: w.deskripsi
}));

const DESTINASI = destinasiRows.map((d) => {
  const rating = ratingStmt.get(d.id);
  return {
    id: d.slug,
    nama: d.nama,
    wilayah: d.wilayah_slug,
    kategori: d.kategori,
    deskripsi: d.deskripsi,
    detail: detailStmt.all(d.id).map((r) => r.paragraf),
    highlight: highlightStmt.all(d.id).map((r) => r.teks),
    aktivitas: aktivitasStmt.all(d.id).map((r) => r.nama),
    waktuTerbaik: d.waktu_terbaik,
    jamBuka: d.jam_buka,
    kontak: d.kontak,
    tarif: d.tarif,
    caraMasuk: d.cara_masuk,
    etika: d.etika,
    budayaTerkait: budayaStmt.all(d.id).map((r) => r.slug),
    whatsapp: d.whatsapp,
    gambar: d.gambar,
    galeri: galeriStmt.all(d.id).map((g) => ({ src: g.path, alt: g.alt })),
    latitude: d.latitude || 0,
    longitude: d.longitude || 0,
    mapsUrl: d.maps_url || (d.latitude ? `https://maps.google.com/?q=${d.latitude},${d.longitude}` : ''),
    // Rating = rata-rata ulasan disetujui; fallback ke rating awal
    rating: rating.jumlah > 0 ? Math.round(rating.rata * 10) / 10 : d.rating_awal,
    ulasan: ulasanStmt.all(d.id).map((u) => ({
      id: u.id,
      nama: u.nama_pengunjung,
      rating: u.rating,
      komentar: u.komentar,
      tanggal: u.created_at ? u.created_at.slice(0, 10) : ''
    }))
  };
});

const BUDAYA = db.prepare('SELECT * FROM budaya ORDER BY id').all().map((b) => ({
  id: b.slug,
  judul: b.judul,
  ringkas: b.ringkas,
  detail: b.detail
}));

const KALENDER = db.prepare('SELECT * FROM kalender ORDER BY id').all().map((k) => ({
  id: k.id,
  nama: k.nama,
  tanggal: k.tanggal_teks,
  keterangan: k.keterangan,
  saran: k.saran,
  sejarah: k.sejarah || ''
}));

const SARI_CONFIG = {
  nama: db.prepare("SELECT value FROM pengaturan WHERE key = 'nama_situs'").get()?.value || 'SARI',
  tagline: db.prepare("SELECT value FROM pengaturan WHERE key = 'tagline'").get()?.value || '',
  versi: '3.0.0-db'
};

// ---------- Tulis file ----------
const isi = `// SARI - Data Aplikasi Wisata Lokal Bali + Etika Budaya
// =====================================================
// !!! FILE INI DIGENERATE OTOMATIS DARI DATABASE !!!
// Sumber: database/sari.db
// JANGAN edit manual. Perubahan lewat panel admin atau:
//   1. Edit database/sari.db
//   2. Jalankan: node database/generate.js
// =====================================================

const SARI_CONFIG = ${JSON.stringify(SARI_CONFIG, null, 2)};

const WILAYAH = ${JSON.stringify(WILAYAH, null, 2)};

const DESTINASI = ${JSON.stringify(DESTINASI, null, 2)};

const BUDAYA = ${JSON.stringify(BUDAYA, null, 2)};

const KALENDER = ${JSON.stringify(KALENDER, null, 2)};
`;

fs.writeFileSync(OUT, isi, 'utf8');
db.close();

console.log(
  `[generate] ${DESTINASI.length} destinasi, ${WILAYAH.length} wilayah, ` +
    `${BUDAYA.length} budaya, ${KALENDER.length} kalender -> ${path.relative(ROOT, OUT)}`
);
