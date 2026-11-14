// =========================================
// SARI - Server (Node tanpa dependensi)
// Jalankan:  node server.js   ->  http://127.0.0.1:3000
// =========================================
// Menyajikan situs statis + API:
//   Tahap 2: login admin, CRUD destinasi, moderasi ulasan
//   Tahap 3: hitung kunjungan, statistik, pencarian FTS
// Setiap perubahan data otomatis meregenerasi assets/js/data.js
// =========================================

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');

const ROOT = __dirname;

// Muat .env sederhana tanpa dependensi eksternal
const ENV_PATH = path.join(ROOT, '.env');
if (fs.existsSync(ENV_PATH)) {
  const envContent = fs.readFileSync(ENV_PATH, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  });
}

const DB_PATH = path.join(ROOT, 'database', 'sari.db');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const PASSWORD_SALT = process.env.PASSWORD_SALT || 'sari-production-salt-default';
const SESSION_TTL_HOURS = parseInt(process.env.SESSION_TTL_HOURS || '24', 10);

const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA foreign_keys = ON;');

// ---------- Util ----------
function kirim(res, status, isi, tipe = 'application/json; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': tipe,
    'Cache-Control': 'no-store'
  });
  res.end(typeof isi === 'string' ? isi : JSON.stringify(isi));
}

function bacaBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch {
        resolve({});
      }
    });
  });
}

function hashPassword(plain) {
  return crypto.scryptSync(plain, PASSWORD_SALT, 32).toString('hex');
}

function verifikasiPassword(plain, hashTersimpan) {
  const hash = hashPassword(plain);
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hashTersimpan));
}

// ---------- Sesi (disimpan di tabel sesi) ----------
function buatSesi(userId) {
  const token = crypto.randomBytes(24).toString('hex');
  const kedaluwarsa = Date.now() + 1000 * 60 * 60 * SESSION_TTL_HOURS;
  db.prepare('INSERT INTO sesi (token, user_id, kedaluwarsa) VALUES (?, ?, ?)').run(
    token,
    userId,
    kedaluwarsa
  );
  return token;
}

function userDariToken(req) {
  const h = req.headers['authorization'] || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return null;
  const s = db
    .prepare('SELECT * FROM sesi WHERE token = ?')
    .get(token);
  if (!s || s.kedaluwarsa < Date.now()) return null;
  return db.prepare('SELECT id, nama, email, role, bio, avatar, created_at FROM users WHERE id = ?').get(s.user_id);
}

function wajibAdmin(req, res) {
  const u = userDariToken(req);
  if (!u || u.role !== 'admin') {
    kirim(res, 401, { error: 'Tidak berwenang. Hanya Admin.' });
    return null;
  }
  return u;
}

function wajibAdminAtauKontributor(req, res) {
  const u = userDariToken(req);
  if (!u || !['admin', 'kontributor'].includes(u.role)) {
    kirim(res, 401, { error: 'Tidak berwenang. Dibutuhkan akun Admin atau Kontributor.' });
    return null;
  }
  return u;
}

function regenerasi() {
  // Jalankan generate.js sebagai proses baru (require akan ter-cache)
  require('child_process').execFileSync(
    process.execPath,
    [path.join(ROOT, 'database', 'generate.js')],
    { stdio: 'inherit' }
  );
}

// ---------- Penyaji file statis ----------
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.db': 'application/octet-stream',
  '.ico': 'image/x-icon'
};

function sajikanFile(res, rel) {
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT)) return kirim(res, 403, { error: 'Terlarang' });
  fs.readFile(file, (err, buf) => {
    if (err) return kirim(res, 404, '<h1>404</h1>', 'text/html; charset=utf-8');
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file)] || 'application/octet-stream'
    });
    res.end(buf);
  });
}

// ---------- Validasi input destinasi ----------
function normDestinasi(b) {
  return {
    slug: String(b.slug || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    nama: String(b.nama || '').trim(),
    kategori: String(b.kategori || '').trim(),
    deskripsi: String(b.deskripsi || '').trim(),
    waktuTerbaik: String(b.waktuTerbaik || '').trim(),
    jamBuka: String(b.jamBuka || '').trim(),
    tarif: String(b.tarif || '').trim(),
    caraMasuk: String(b.caraMasuk || '').trim(),
    etika: String(b.etika || '').trim(),
    whatsapp: b.whatsapp ? String(b.whatsapp).replace(/\D/g, '') : null,
    kontak: String(b.kontak || '-').trim(),
    gambar: String(b.gambar || '').trim(),
    latitude: parseFloat(b.latitude) || 0,
    longitude: parseFloat(b.longitude) || 0,
    maps_url: String(b.maps_url || '').trim(),
    galeri: Array.isArray(b.galeri)
      ? b.galeri.map((g) => ({ src: String(g.src || '').trim(), alt: String(g.alt || '').trim() })).filter((g) => g.src)
      : [],
    detail: Array.isArray(b.detail) ? b.detail.map((p) => String(p).trim()).filter(Boolean) : [],
    highlight: Array.isArray(b.highlight) ? b.highlight.map((h) => String(h).trim()).filter(Boolean) : [],
    aktivitas: Array.isArray(b.aktivitas) ? b.aktivitas.map((a) => String(a).trim()).filter(Boolean) : [],
    budayaTerkait: Array.isArray(b.budayaTerkait) ? b.budayaTerkait.map((s) => String(s).trim()).filter(Boolean) : [],
    wilayahSlug: String(b.wilayah || '').trim(),
    isUnggulan: b.isUnggulan ? 1 : 0,
    status: b.status === 'draft' ? 'draft' : 'aktif'
  };
}

function simpanAnakDestinasi(id, d) {
  db.prepare('DELETE FROM destinasi_detail WHERE destinasi_id = ?').run(id);
  db.prepare('DELETE FROM destinasi_highlight WHERE destinasi_id = ?').run(id);
  db.prepare('DELETE FROM destinasi_aktivitas WHERE destinasi_id = ?').run(id);
  db.prepare('DELETE FROM destinasi_budaya WHERE destinasi_id = ?').run(id);
  db.prepare('DELETE FROM destinasi_gambar WHERE destinasi_id = ?').run(id);

  d.detail.forEach((p, i) =>
    db.prepare('INSERT INTO destinasi_detail (destinasi_id, urutan, paragraf) VALUES (?, ?, ?)').run(id, i, p)
  );
  d.highlight.forEach((h, i) =>
    db.prepare('INSERT INTO destinasi_highlight (destinasi_id, urutan, teks) VALUES (?, ?, ?)').run(id, i, h)
  );
  db.prepare('INSERT INTO destinasi_gambar (destinasi_id, path, alt, is_utama) VALUES (?, ?, ?, 1)').run(
    id,
    d.gambar,
    d.nama
  );
  d.galeri.forEach((g) =>
    db.prepare('INSERT INTO destinasi_gambar (destinasi_id, path, alt, is_utama) VALUES (?, ?, ?, 0)').run(
      id,
      g.src,
      g.alt
    )
  );
  d.aktivitas.forEach((a) => {
    let ex = db.prepare('SELECT id FROM aktivitas WHERE nama = ?').get(a);
    if (!ex) ex = { id: Number(db.prepare('INSERT INTO aktivitas (nama) VALUES (?)').run(a).lastInsertRowid) };
    db.prepare('INSERT INTO destinasi_aktivitas (destinasi_id, aktivitas_id) VALUES (?, ?)').run(id, ex.id);
  });
  d.budayaTerkait.forEach((s) => {
    const b = db.prepare('SELECT id FROM budaya WHERE slug = ?').get(s);
    if (b) db.prepare('INSERT INTO destinasi_budaya (destinasi_id, budaya_id) VALUES (?, ?)').run(id, b.id);
  });
}

// ---------- Router API ----------
async function handleAPI(req, res, url) {
  const p = url.pathname;
  const metode = req.method;

  // ---- Publik ----
  if (metode === 'POST' && p === '/api/register') {
    const b = await bacaBody(req);
    const nama = String(b.nama || '').trim();
    const email = String(b.email || '').trim().toLowerCase();
    const password = String(b.password || '');

    if (!nama || !email || !password) {
      return kirim(res, 400, { error: 'Nama, email, dan kata sandi wajib diisi' });
    }
    if (password.length < 6) {
      return kirim(res, 400, { error: 'Kata sandi minimal 6 karakter' });
    }
    const cek = db.prepare('SELECT 1 FROM users WHERE email = ?').get(email);
    if (cek) {
      return kirim(res, 400, { error: 'Email sudah terdaftar' });
    }

    const roleDipilih = ['admin', 'kontributor'].includes(b.role) ? b.role : 'user';

    const r = db.prepare(
      'INSERT INTO users (nama, email, password_hash, role) VALUES (?, ?, ?, ?)'
    ).run(nama, email, hashPassword(password), roleDipilih);

    const userId = Number(r.lastInsertRowid);
    const token = buatSesi(userId);
    return kirim(res, 201, {
      token,
      user: { id: userId, nama, email, role: roleDipilih, bio: '', avatar: '' }
    });
  }

  if (metode === 'POST' && p === '/api/login') {
    const b = await bacaBody(req);
    const u = db.prepare('SELECT * FROM users WHERE email = ?').get(String(b.email || '').trim().toLowerCase());
    if (!u || !verifikasiPassword(String(b.password || ''), u.password_hash)) {
      return kirim(res, 401, { error: 'Email atau kata sandi salah' });
    }
    return kirim(res, 200, {
      token: buatSesi(u.id),
      user: { id: u.id, nama: u.nama, email: u.email, role: u.role, bio: u.bio || '', avatar: u.avatar || '' }
    });
  }

  // ---- Bookmark / Favorit Pengguna ----
  if (metode === 'GET' && p === '/api/bookmark') {
    const u = userDariToken(req);
    if (!u) return kirim(res, 401, { error: 'Belum login' });
    const list = db.prepare(`
      SELECT d.*, b.created_at AS bookmarked_at
      FROM bookmark b
      JOIN destinasi d ON d.id = b.destinasi_id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `).all(u.id);
    return kirim(res, 200, list);
  }

  if (metode === 'POST' && p === '/api/bookmark') {
    const u = userDariToken(req);
    if (!u) return kirim(res, 401, { error: 'Silakan login terlebih dahulu untuk menyimpan destinasi favorit' });
    const b = await bacaBody(req);
    const d = db.prepare('SELECT id FROM destinasi WHERE slug = ?').get(String(b.slug || ''));
    if (!d) return kirim(res, 404, { error: 'Destinasi tidak ditemukan' });

    db.prepare(`
      INSERT OR IGNORE INTO bookmark (user_id, destinasi_id) VALUES (?, ?)
    `).run(u.id, d.id);
    return kirim(res, 200, { ok: true, saved: true, pesan: 'Destinasi disimpan ke favorit' });
  }

  if (metode === 'DELETE' && p.startsWith('/api/bookmark/')) {
    const u = userDariToken(req);
    if (!u) return kirim(res, 401, { error: 'Belum login' });
    const slug = p.replace('/api/bookmark/', '');
    const d = db.prepare('SELECT id FROM destinasi WHERE slug = ?').get(slug);
    if (d) {
      db.prepare('DELETE FROM bookmark WHERE user_id = ? AND destinasi_id = ?').run(u.id, d.id);
    }
    return kirim(res, 200, { ok: true, saved: false, pesan: 'Dihapus dari favorit' });
  }

  // ---- Upload Gambar Mandiri (Buffer Binary) ----
  if (metode === 'POST' && p === '/api/upload') {
    const u = wajibAdminAtauKontributor(req, res);
    if (!u) return;

    return new Promise((resolve) => {
      const chunks = [];
      req.on('data', c => chunks.push(c));
      req.on('end', () => {
        try {
          const buffer = Buffer.concat(chunks);
          // Cari header multipart sederhana
          const contentType = req.headers['content-type'] || '';
          const match = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
          if (!match) {
            kirim(res, 400, { error: 'Gunakan multipart form upload' });
            return resolve();
          }
          const boundary = match[1] || match[2];
          const parts = buffer.toString('binary').split('--' + boundary);

          let fileData = null;
          let filename = 'upload-' + Date.now() + '.jpg';

          for (const part of parts) {
            if (part.includes('filename="')) {
              const mName = part.match(/filename="([^"]+)"/);
              if (mName) {
                const ext = path.extname(mName[1]).toLowerCase() || '.jpg';
                filename = 'img-' + Date.now() + '-' + Math.round(Math.random() * 1e4) + ext;
              }
              const headerEnd = part.indexOf('\r\n\r\n');
              if (headerEnd !== -1) {
                const bodyStr = part.slice(headerEnd + 4, part.lastIndexOf('\r\n'));
                fileData = Buffer.from(bodyStr, 'binary');
              }
              break;
            }
          }

          if (!fileData || fileData.length === 0) {
            kirim(res, 400, { error: 'File gambar tidak ditemukan' });
            return resolve();
          }

          const targetDir = path.join(ROOT, 'assets', 'images');
          if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
          const targetPath = path.join(targetDir, filename);

          fs.writeFileSync(targetPath, fileData);
          kirim(res, 200, { ok: true, path: 'assets/images/' + filename });
          resolve();
        } catch (err) {
          kirim(res, 500, { error: 'Gagal mengunggah gambar: ' + err.message });
          resolve();
        }
      });
    });
  }
  if (metode === 'GET' && p === '/api/me') {
    const u = userDariToken(req);
    if (!u) return kirim(res, 401, { error: 'Belum login' });
    const ulasanSaya = db.prepare(`
      SELECT u.*, d.nama AS destinasi_nama, d.slug AS destinasi_slug
      FROM ulasan u JOIN destinasi d ON d.id = u.destinasi_id
      WHERE u.nama_pengunjung = ? OR u.nama_pengunjung = ?
      ORDER BY u.created_at DESC
    `).all(u.nama, u.email);
    return kirim(res, 200, { user: u, ulasan: ulasanSaya });
  }

  if (metode === 'PUT' && p === '/api/me') {
    const u = userDariToken(req);
    if (!u) return kirim(res, 401, { error: 'Belum login' });
    const b = await bacaBody(req);
    const nama = String(b.nama || u.nama).trim();
    const bio = String(b.bio !== undefined ? b.bio : u.bio || '').trim();
    const avatar = String(b.avatar !== undefined ? b.avatar : u.avatar || '').trim();

    if (!nama) return kirim(res, 400, { error: 'Nama tidak boleh kosong' });

    if (b.passwordBaru) {
      if (String(b.passwordBaru).length < 6) {
        return kirim(res, 400, { error: 'Kata sandi baru minimal 6 karakter' });
      }
      db.prepare('UPDATE users SET nama = ?, bio = ?, avatar = ?, password_hash = ? WHERE id = ?')
        .run(nama, bio, avatar, hashPassword(String(b.passwordBaru)), u.id);
    } else {
      db.prepare('UPDATE users SET nama = ?, bio = ?, avatar = ? WHERE id = ?')
        .run(nama, bio, avatar, u.id);
    }

    const updated = db.prepare('SELECT id, nama, email, role, bio, avatar, created_at FROM users WHERE id = ?').get(u.id);
    return kirim(res, 200, { ok: true, user: updated });
  }

  if (metode === 'POST' && p === '/api/kunjungan') {
    const b = await bacaBody(req);
    const d = db.prepare('SELECT id FROM destinasi WHERE slug = ?').get(String(b.slug || ''));
    if (!d) return kirim(res, 404, { error: 'Destinasi tidak ditemukan' });
    db.prepare(`
      INSERT INTO statistik_kunjungan (destinasi_id, tanggal, jumlah)
      VALUES (?, date('now'), 1)
      ON CONFLICT (destinasi_id, tanggal) DO UPDATE SET jumlah = jumlah + 1
    `).run(d.id);
    return kirim(res, 200, { ok: true });
  }

  if (metode === 'POST' && p === '/api/ulasan') {
    const b = await bacaBody(req);
    const d = db.prepare('SELECT id FROM destinasi WHERE slug = ?').get(String(b.slug || ''));
    const rating = parseInt(b.rating, 10);
    if (!d || !(rating >= 1 && rating <= 5) || !String(b.nama_pengunjung || '').trim()) {
      return kirim(res, 400, { error: 'Data ulasan tidak lengkap' });
    }
    const r = db.prepare(
      "INSERT INTO ulasan (destinasi_id, nama_pengunjung, rating, komentar, status) VALUES (?, ?, ?, ?, 'disetujui')"
    ).run(d.id, String(b.nama_pengunjung).trim(), rating, String(b.komentar || '').trim());
    try { regenerasi(); } catch (e) { console.error('Regenerasi error:', e); }
    return kirim(res, 201, {
      ok: true,
      pesan: 'Terima kasih! Ulasan Anda berhasil diterbitkan.',
      ulasan: {
        id: Number(r.lastInsertRowid),
        nama: String(b.nama_pengunjung).trim(),
        rating,
        komentar: String(b.komentar || '').trim(),
        tanggal: new Date().toISOString().slice(0, 10)
      }
    });
  }

  if (metode === 'GET' && p === '/api/cari') {
    const q = String(url.searchParams.get('q') || '').trim();
    if (!q) return kirim(res, 200, []);
    const rows = db
      .prepare(`
        SELECT rowid AS id, nama, deskripsi FROM destinasi_fts
        WHERE destinasi_fts MATCH ? ORDER BY rank LIMIT 10
      `)
      .all(q.replace(/["'*]/g, ' '));
    return kirim(res, 200, rows);
  }

  // ---- Admin ----
  if (metode === 'POST' && p === '/api/logout') {
    const u = userDariToken(req);
    if (u) {
      const token = (req.headers['authorization'] || '').slice(7);
      db.prepare('DELETE FROM sesi WHERE token = ?').run(token);
    }
    return kirim(res, 200, { ok: true });
  }

  if (metode === 'GET' && p === '/api/destinasi') {
    if (!wajibAdminAtauKontributor(req, res)) return;
    const u = userDariToken(req);
    const kondisiUser = u.role === 'kontributor' ? 'WHERE d.user_id = ?' : '';
    const args = u.role === 'kontributor' ? [u.id] : [];
    const rows = db.prepare(`
      SELECT d.*, w.slug AS wilayah_slug, w.nama AS wilayah_nama,
        (SELECT AVG(rating) FROM ulasan u WHERE u.destinasi_id = d.id AND u.status = 'disetujui') AS rating_rata,
        (SELECT COUNT(*) FROM ulasan u WHERE u.destinasi_id = d.id AND u.status = 'pending') AS ulasan_pending,
        (SELECT COALESCE(SUM(jumlah),0) FROM statistik_kunjungan s WHERE s.destinasi_id = d.id) AS kunjungan
      FROM destinasi d JOIN wilayah w ON w.id = d.wilayah_id
      ${kondisiUser}
      ORDER BY d.id
    `).all(...args);
    return kirim(res, 200, rows);
  }

  if (metode === 'POST' && p === '/api/destinasi') {
    if (!wajibAdminAtauKontributor(req, res)) return;
    const d = normDestinasi(await bacaBody(req));
    if (!d.slug || !d.nama || !d.wilayahSlug) return kirim(res, 400, { error: 'Slug, nama, dan wilayah wajib diisi' });
    const w = db.prepare('SELECT id FROM wilayah WHERE slug = ?').get(d.wilayahSlug);
    if (!w) return kirim(res, 400, { error: 'Wilayah tidak ditemukan' });
    if (db.prepare('SELECT 1 FROM destinasi WHERE slug = ?').get(d.slug)) {
      return kirim(res, 400, { error: 'Slug sudah dipakai' });
    }
    const u = userDariToken(req);
    const r = db.prepare(`
      INSERT INTO destinasi
        (slug, wilayah_id, nama, kategori, deskripsi, waktu_terbaik, jam_buka, tarif,
         cara_masuk, etika, whatsapp, kontak, gambar, latitude, longitude, maps_url,
         is_unggulan, status, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      d.slug, w.id, d.nama, d.kategori, d.deskripsi, d.waktuTerbaik, d.jamBuka,
      d.tarif, d.caraMasuk, d.etika, d.whatsapp, d.kontak, d.gambar,
      d.latitude, d.longitude, d.maps_url, d.isUnggulan, d.status, u.id
    );
    simpanAnakDestinasi(Number(r.lastInsertRowid), d);
    regenerasi();
    return kirim(res, 201, { ok: true, id: Number(r.lastInsertRowid) });
  }

  const mEdit = p.match(/^\/api\/destinasi\/(\d+)$/);
  if (mEdit && (metode === 'PUT' || metode === 'DELETE')) {
    if (!wajibAdminAtauKontributor(req, res)) return;
    const u = userDariToken(req);
    const id = Number(mEdit[1]);
    if (!db.prepare('SELECT 1 FROM destinasi WHERE id = ?').get(id)) {
      return kirim(res, 404, { error: 'Destinasi tidak ditemukan' });
    }
    // Kontributor hanya boleh mengedit/hapus destinasi milik sendiri
    if (u.role === 'kontributor') {
      const pemilik = db.prepare('SELECT user_id FROM destinasi WHERE id = ?').get(id);
      if (!pemilik || pemilik.user_id !== u.id) {
        return kirim(res, 403, { error: 'Tidak berwenang mengedit destinasi ini' });
      }
    }
    if (metode === 'DELETE') {
      db.prepare('DELETE FROM destinasi WHERE id = ?').run(id);
      regenerasi();
      return kirim(res, 200, { ok: true });
    }
    const d = normDestinasi(await bacaBody(req));
    const w = db.prepare('SELECT id FROM wilayah WHERE slug = ?').get(d.wilayahSlug);
    if (!w) return kirim(res, 400, { error: 'Wilayah tidak ditemukan' });
    db.prepare(`
      UPDATE destinasi SET
        slug = ?, wilayah_id = ?, nama = ?, kategori = ?, deskripsi = ?,
        waktu_terbaik = ?, jam_buka = ?, tarif = ?, cara_masuk = ?, etika = ?,
        whatsapp = ?, kontak = ?, gambar = ?, latitude = ?, longitude = ?, maps_url = ?,
        is_unggulan = ?, status = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).run(
      d.slug, w.id, d.nama, d.kategori, d.deskripsi, d.waktuTerbaik, d.jamBuka,
      d.tarif, d.caraMasuk, d.etika, d.whatsapp, d.kontak, d.gambar,
      d.latitude, d.longitude, d.maps_url,
      d.isUnggulan, d.status, id
    );
    simpanAnakDestinasi(id, d);
    regenerasi();
    return kirim(res, 200, { ok: true });
  }

  if (metode === 'GET' && p === '/api/ulasan') {
    const slug = url.searchParams.get('slug') || url.searchParams.get('destinasi');
    if (slug) {
      const d = db.prepare('SELECT id FROM destinasi WHERE slug = ?').get(slug);
      if (!d) return kirim(res, 404, { error: 'Destinasi tidak ditemukan' });
      const rows = db.prepare(`
        SELECT id, nama_pengunjung, rating, komentar, created_at
        FROM ulasan
        WHERE destinasi_id = ? AND status = 'disetujui'
        ORDER BY created_at DESC
      `).all(d.id);
      return kirim(res, 200, rows);
    }
    if (!wajibAdmin(req, res)) return;
    const rows = db.prepare(`
      SELECT u.*, d.nama AS destinasi_nama FROM ulasan u
      JOIN destinasi d ON d.id = u.destinasi_id
      ORDER BY (u.status = 'pending') DESC, u.created_at DESC
    `).all();
    return kirim(res, 200, rows);
  }

  const mUlasan = p.match(/^\/api\/ulasan\/(\d+)$/);
  if (mUlasan) {
    if (!wajibAdmin(req, res)) return;
    const id = Number(mUlasan[1]);
    if (metode === 'PUT') {
      const b = await bacaBody(req);
      if (!['disetujui', 'ditolak', 'pending'].includes(b.status)) {
        return kirim(res, 400, { error: 'Status tidak valid' });
      }
      db.prepare('UPDATE ulasan SET status = ? WHERE id = ?').run(b.status, id);
      regenerasi();
      return kirim(res, 200, { ok: true });
    }
    if (metode === 'DELETE') {
      db.prepare('DELETE FROM ulasan WHERE id = ?').run(id);
      regenerasi();
      return kirim(res, 200, { ok: true });
    }
  }

  if (metode === 'GET' && p === '/api/statistik') {
    if (!wajibAdmin(req, res)) return;
    const perDestinasi = db.prepare(`
      SELECT d.nama, COALESCE(SUM(s.jumlah), 0) AS total
      FROM destinasi d LEFT JOIN statistik_kunjungan s ON s.destinasi_id = d.id
      GROUP BY d.id ORDER BY total DESC
    `).all();
    const harian = db.prepare(`
      SELECT tanggal, SUM(jumlah) AS total FROM statistik_kunjungan
      GROUP BY tanggal ORDER BY tanggal DESC LIMIT 14
    `).all();
    return kirim(res, 200, { perDestinasi, harian });
  }

  // ---- Admin: Kelola Kalender Agama (CRUD) ----
  if (metode === 'GET' && p === '/api/kalender') {
    const list = db.prepare('SELECT * FROM kalender ORDER BY id').all();
    return kirim(res, 200, list);
  }

  if (metode === 'POST' && p === '/api/kalender') {
    if (!wajibAdmin(req, res)) return;
    const b = await bacaBody(req);
    const nama = String(b.nama || '').trim();
    if (!nama) return kirim(res, 400, { error: 'Nama hari suci wajib diisi' });

    db.prepare(`
      INSERT INTO kalender (nama, tanggal_teks, keterangan, saran, sejarah)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      nama,
      String(b.tanggal || b.tanggal_teks || '').trim(),
      String(b.keterangan || '').trim(),
      String(b.saran || '').trim(),
      String(b.sejarah || '').trim()
    );
    regenerasi();
    return kirim(res, 201, { ok: true, pesan: 'Hari suci berhasil ditambahkan' });
  }

  const mKalender = p.match(/^\/api\/kalender\/(\d+)$/);
  if (mKalender) {
    if (!wajibAdmin(req, res)) return;
    const id = Number(mKalender[1]);
    if (metode === 'PUT') {
      const b = await bacaBody(req);
      db.prepare(`
        UPDATE kalender SET
          nama = ?, tanggal_teks = ?, keterangan = ?, saran = ?, sejarah = ?
        WHERE id = ?
      `).run(
        String(b.nama || '').trim(),
        String(b.tanggal || b.tanggal_teks || '').trim(),
        String(b.keterangan || '').trim(),
        String(b.saran || '').trim(),
        String(b.sejarah || '').trim(),
        id
      );
      regenerasi();
      return kirim(res, 200, { ok: true, pesan: 'Hari suci berhasil diperbarui' });
    }
    if (metode === 'DELETE') {
      db.prepare('DELETE FROM kalender WHERE id = ?').run(id);
      regenerasi();
      return kirim(res, 200, { ok: true, pesan: 'Hari suci berhasil dihapus' });
    }
  }

  // ---- Admin: Kelola Etika Budaya (CRUD) ----
  if (metode === 'GET' && p === '/api/budaya') {
    const list = db.prepare('SELECT * FROM budaya ORDER BY id').all();
    return kirim(res, 200, list);
  }

  if (metode === 'POST' && p === '/api/budaya') {
    if (!wajibAdmin(req, res)) return;
    const b = await bacaBody(req);
    const judul = String(b.judul || '').trim();
    let slug = String(b.slug || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (!judul) return kirim(res, 400, { error: 'Judul etika budaya wajib diisi' });
    if (!slug) slug = 'etika-' + Date.now();

    db.prepare(`
      INSERT INTO budaya (slug, judul, ringkas, detail)
      VALUES (?, ?, ?, ?)
    `).run(slug, judul, String(b.ringkas || '').trim(), String(b.detail || '').trim());
    regenerasi();
    return kirim(res, 201, { ok: true, pesan: 'Etika budaya berhasil ditambahkan' });
  }

  const mBudaya = p.match(/^\/api\/budaya\/(\d+)$/);
  if (mBudaya) {
    if (!wajibAdmin(req, res)) return;
    const id = Number(mBudaya[1]);
    if (metode === 'PUT') {
      const b = await bacaBody(req);
      db.prepare(`
        UPDATE budaya SET
          slug = ?, judul = ?, ringkas = ?, detail = ?
        WHERE id = ?
      `).run(
        String(b.slug || '').trim(),
        String(b.judul || '').trim(),
        String(b.ringkas || '').trim(),
        String(b.detail || '').trim(),
        id
      );
      regenerasi();
      return kirim(res, 200, { ok: true, pesan: 'Etika budaya berhasil diperbarui' });
    }
    if (metode === 'DELETE') {
      db.prepare('DELETE FROM budaya WHERE id = ?').run(id);
      regenerasi();
      return kirim(res, 200, { ok: true, pesan: 'Etika budaya berhasil dihapus' });
    }
  }

  if (metode === 'POST' && p === '/api/regenerasi') {
    if (!wajibAdmin(req, res)) return;
    regenerasi();
    return kirim(res, 200, { ok: true, pesan: 'data.js diregenerasi dari database' });
  }

  return kirim(res, 404, { error: 'Endpoint tidak ditemukan' });
}

// ---------- Server ----------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
  try {
    if (url.pathname.startsWith('/api/')) {
      return await handleAPI(req, res, url);
    }
    let rel = decodeURIComponent(url.pathname);
    if (rel === '/') rel = '/index.html';
    return sajikanFile(res, rel);
  } catch (err) {
    console.error('[server]', err);
    return kirim(res, 500, { error: 'Kesalahan server' });
  }
});

server.listen(PORT, HOST || '0.0.0.0', () => {
  console.log(`[server] SARI berjalan di http://127.0.0.1:${PORT}`);
  console.log('[server] Panel admin: http://127.0.0.1:' + PORT + '/admin.html');
});
