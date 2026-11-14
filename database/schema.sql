-- =========================================
-- SARI - Skema Database SQLite
-- Tahap 1: tabel inti 1-9
-- Tahap 2: users, ulasan
-- Tahap 3: statistik, full-text search
-- =========================================

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- ---------- TAHAP 1: TABEL INTI ----------

-- 1. Wilayah
CREATE TABLE IF NOT EXISTS wilayah (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  nama TEXT NOT NULL,
  deskripsi TEXT NOT NULL DEFAULT ''
);

-- 2. Destinasi
CREATE TABLE IF NOT EXISTS destinasi (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  wilayah_id INTEGER NOT NULL REFERENCES wilayah(id),
  nama TEXT NOT NULL,
  kategori TEXT NOT NULL DEFAULT '',
  deskripsi TEXT NOT NULL DEFAULT '',
  waktu_terbaik TEXT NOT NULL DEFAULT '',
  jam_buka TEXT NOT NULL DEFAULT '',
  tarif TEXT NOT NULL DEFAULT '',
  cara_masuk TEXT NOT NULL DEFAULT '',
  etika TEXT NOT NULL DEFAULT '',
  whatsapp TEXT,
  kontak TEXT NOT NULL DEFAULT '-',
  rating_awal REAL NOT NULL DEFAULT 4.5,
  gambar TEXT NOT NULL DEFAULT '',
  is_unggulan INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'aktif' CHECK (status IN ('draft', 'aktif')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3. Paragraf detail (urutan menjaga susunan cerita)
CREATE TABLE IF NOT EXISTS destinasi_detail (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destinasi_id INTEGER NOT NULL REFERENCES destinasi(id) ON DELETE CASCADE,
  urutan INTEGER NOT NULL DEFAULT 0,
  paragraf TEXT NOT NULL
);

-- 4. Foto (multi-foto: is_utama = 1 dipakai kartu & hero)
CREATE TABLE IF NOT EXISTS destinasi_gambar (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destinasi_id INTEGER NOT NULL REFERENCES destinasi(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  is_utama INTEGER NOT NULL DEFAULT 0,
  kredit TEXT NOT NULL DEFAULT 'Wikimedia Commons',
  sumber_url TEXT NOT NULL DEFAULT ''
);

-- 5. Sorotan utama (check-list halaman detail)
CREATE TABLE IF NOT EXISTS destinasi_highlight (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destinasi_id INTEGER NOT NULL REFERENCES destinasi(id) ON DELETE CASCADE,
  urutan INTEGER NOT NULL DEFAULT 0,
  teks TEXT NOT NULL
);

-- 6a. Master aktivitas (agar "Fotografi" tidak duplikat antar destinasi)
CREATE TABLE IF NOT EXISTS aktivitas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL UNIQUE
);

-- 6b. Relasi destinasi - aktivitas
CREATE TABLE IF NOT EXISTS destinasi_aktivitas (
  destinasi_id INTEGER NOT NULL REFERENCES destinasi(id) ON DELETE CASCADE,
  aktivitas_id INTEGER NOT NULL REFERENCES aktivitas(id) ON DELETE CASCADE,
  PRIMARY KEY (destinasi_id, aktivitas_id)
);

-- 7. Topik budaya / etika
CREATE TABLE IF NOT EXISTS budaya (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  judul TEXT NOT NULL,
  ringkas TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT ''
);

-- 8. Relasi destinasi - budaya
CREATE TABLE IF NOT EXISTS destinasi_budaya (
  destinasi_id INTEGER NOT NULL REFERENCES destinasi(id) ON DELETE CASCADE,
  budaya_id INTEGER NOT NULL REFERENCES budaya(id) ON DELETE CASCADE,
  PRIMARY KEY (destinasi_id, budaya_id)
);

-- 9. Kalender hari suci
CREATE TABLE IF NOT EXISTS kalender (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  tanggal_teks TEXT NOT NULL DEFAULT '',
  keterangan TEXT NOT NULL DEFAULT '',
  saran TEXT NOT NULL DEFAULT ''
);

-- ---------- TAHAP 2: USERS & ULASAN ----------

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'kontributor', 'user')),
  bio TEXT NOT NULL DEFAULT '',
  avatar TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ulasan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destinasi_id INTEGER NOT NULL REFERENCES destinasi(id) ON DELETE CASCADE,
  nama_pengunjung TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  komentar TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'disetujui', 'ditolak')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sesi (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kedaluwarsa INTEGER NOT NULL
);

-- ---------- TAHAP 3: STATISTIK & FULL-TEXT SEARCH ----------

CREATE TABLE IF NOT EXISTS statistik_kunjungan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destinasi_id INTEGER NOT NULL REFERENCES destinasi(id) ON DELETE CASCADE,
  tanggal TEXT NOT NULL DEFAULT (date('now')),
  jumlah INTEGER NOT NULL DEFAULT 0,
  UNIQUE (destinasi_id, tanggal)
);

CREATE TABLE IF NOT EXISTS pengaturan (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);

-- FTS5 untuk pencarian server-side (dipakai API /api/cari)
CREATE VIRTUAL TABLE IF NOT EXISTS destinasi_fts USING fts5(
  nama, deskripsi,
  content='destinasi',
  content_rowid='id'
);

-- Sinkronisasi FTS saat data destinasi berubah
CREATE TRIGGER IF NOT EXISTS destinasi_ai AFTER INSERT ON destinasi BEGIN
  INSERT INTO destinasi_fts(rowid, nama, deskripsi)
  VALUES (new.id, new.nama, new.deskripsi);
END;

CREATE TRIGGER IF NOT EXISTS destinasi_ad AFTER DELETE ON destinasi BEGIN
  INSERT INTO destinasi_fts(destinasi_fts, rowid, nama, deskripsi)
  VALUES ('delete', old.id, old.nama, old.deskripsi);
END;

CREATE TRIGGER IF NOT EXISTS destinasi_au AFTER UPDATE ON destinasi BEGIN
  INSERT INTO destinasi_fts(destinasi_fts, rowid, nama, deskripsi)
  VALUES ('delete', old.id, old.nama, old.deskripsi);
  INSERT INTO destinasi_fts(rowid, nama, deskripsi)
  VALUES (new.id, new.nama, new.deskripsi);
END;

CREATE INDEX IF NOT EXISTS idx_destinasi_wilayah ON destinasi(wilayah_id);
CREATE INDEX IF NOT EXISTS idx_ulasan_destinasi ON ulasan(destinasi_id, status);
