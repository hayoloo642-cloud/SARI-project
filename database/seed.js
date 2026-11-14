// =========================================
// SARI - Seed: migrasi data.js -> SQLite
// Jalankan SEKALI:  node database/seed.js
// =========================================
// Membaca isi data.js versi manual (sumber awal), memasukkan
// ke database/sari.db. Setelah ini, data.js DIGENERATE dari DB
// lewat database/generate.js — jangan edit data.js manual lagi.
// =========================================

'use strict';

const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const ROOT = path.join(__dirname, '..');
const DB_PATH = path.join(__dirname, 'sari.db');

// ---------- Baca data.js manual sebagai sumber ----------
function muatSumber() {
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'data.js'), 'utf8');
  const fn = new Function(
    src +
      '; return { SARI_CONFIG, WILAYAH, DESTINASI, BUDAYA, KALENDER };'
  );
  return fn();
}

// ---------- Siapkan database ----------
if (fs.existsSync(DB_PATH)) {
  console.log('[seed] Hapus database lama:', DB_PATH);
  fs.unlinkSync(DB_PATH);
}
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA foreign_keys = ON;');
db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));

const data = muatSumber();

const insertWilayah = db.prepare(
  'INSERT INTO wilayah (slug, nama, deskripsi) VALUES (?, ?, ?)'
);
const insertDestinasi = db.prepare(`
  INSERT INTO destinasi
    (slug, wilayah_id, nama, kategori, deskripsi, waktu_terbaik, jam_buka,
     tarif, cara_masuk, etika, whatsapp, kontak, rating_awal, gambar, is_unggulan)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const insertDetail = db.prepare(
  'INSERT INTO destinasi_detail (destinasi_id, urutan, paragraf) VALUES (?, ?, ?)'
);
const insertGambar = db.prepare(
  'INSERT INTO destinasi_gambar (destinasi_id, path, alt, is_utama) VALUES (?, ?, ?, 1)'
);
const insertHighlight = db.prepare(
  'INSERT INTO destinasi_highlight (destinasi_id, urutan, teks) VALUES (?, ?, ?)'
);
const insertAktivitas = db.prepare('INSERT INTO aktivitas (nama) VALUES (?)');
const findAktivitas = db.prepare('SELECT id FROM aktivitas WHERE nama = ?');
const insertDestAkt = db.prepare(
  'INSERT INTO destinasi_aktivitas (destinasi_id, aktivitas_id) VALUES (?, ?)'
);
const insertBudaya = db.prepare(
  'INSERT INTO budaya (slug, judul, ringkas, detail) VALUES (?, ?, ?, ?)'
);
const insertDestBudaya = db.prepare(
  'INSERT INTO destinasi_budaya (destinasi_id, budaya_id) VALUES (?, ?)'
);
const insertKalender = db.prepare(
  'INSERT INTO kalender (nama, tanggal_teks, keterangan, saran) VALUES (?, ?, ?, ?)'
);
const insertUser = db.prepare(
  'INSERT INTO users (nama, email, password_hash, role) VALUES (?, ?, ?, ?)'
);
const insertPengaturan = db.prepare(
  'INSERT INTO pengaturan (key, value) VALUES (?, ?)'
);

// ---------- Hash password (scrypt bawaan Node) ----------
function hashPassword(plain) {
  const salt = Buffer.from('sari-seed-salt-2026');
  const hash = require('crypto').scryptSync(plain, salt, 32);
  return hash.toString('hex');
}

// ---------- Transaksi ----------
db.exec('BEGIN');

try {
  // Wilayah
  const wilayahId = {};
  for (const w of data.WILAYAH) {
    const r = insertWilayah.run(w.id, w.nama, w.deskripsi);
    wilayahId[w.id] = Number(r.lastInsertRowid);
  }
  console.log('[seed] Wilayah:', data.WILAYAH.length);

  // Budaya (dulu, supaya bisa direlasikan ke destinasi)
  const budayaId = {};
  for (const b of data.BUDAYA) {
    const r = insertBudaya.run(b.id, b.judul, b.ringkas, b.detail);
    budayaId[b.id] = Number(r.lastInsertRowid);
  }
  console.log('[seed] Budaya:', data.BUDAYA.length);

  // Destinasi
  for (const d of data.DESTINASI) {
    const r = insertDestinasi.run(
      d.id,
      wilayahId[d.wilayah],
      d.nama,
      d.kategori,
      d.deskripsi,
      d.waktuTerbaik || '',
      d.jamBuka || '',
      d.tarif || '',
      d.caraMasuk || '',
      d.etika || '',
      d.whatsapp || null,
      d.kontak || '-',
      d.rating || 4.5,
      d.gambar || '',
      1
    );
    const id = Number(r.lastInsertRowid);

    (d.detail || []).forEach((p, i) => insertDetail.run(id, i, p));
    insertGambar.run(id, d.gambar, d.nama);
    (d.highlight || []).forEach((h, i) => insertHighlight.run(id, i, h));
    (d.aktivitas || []).forEach((a) => {
      let ex = findAktivitas.get(a);
      if (!ex) {
        const ra = insertAktivitas.run(a);
        ex = { id: Number(ra.lastInsertRowid) };
      }
      insertDestAkt.run(id, Number(ex.id));
    });
    (d.budayaTerkait || []).forEach((b) => {
      if (budayaId[b]) insertDestBudaya.run(id, budayaId[b]);
    });
  }
  console.log('[seed] Destinasi:', data.DESTINASI.length);

  // Kalender
  for (const k of data.KALENDER) {
    insertKalender.run(k.nama, k.tanggal, k.keterangan, k.saran);
  }
  console.log('[seed] Kalender:', data.KALENDER.length);

  // Pengaturan situs
  insertPengaturan.run('nama_situs', data.SARI_CONFIG.nama);
  insertPengaturan.run('tagline', data.SARI_CONFIG.tagline);
  insertPengaturan.run('whatsapp_pusat', '6281234567890');

  // Tahap 2: user admin default
  insertUser.run(
    'Administrator SARI',
    'admin@sari-bali.id',
    hashPassword('sari2026'),
    'admin'
  );
  console.log('[seed] User admin: admin@sari-bali.id / sari2026 (GANTI setelah login!)');

  db.exec('COMMIT');
  console.log('[seed] Selesai ->', DB_PATH);
} catch (err) {
  db.exec('ROLLBACK');
  console.error('[seed] GAGAL, dibatalkan:', err.message);
  process.exit(1);
} finally {
  db.close();
}
