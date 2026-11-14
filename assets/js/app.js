// SARI - Aplikasi Web Wisata Lokal Bali + Etika Budaya
// Semua logika rendering di sisi klien, tidak perlu backend
// Ikon: SVG inline (tanpa emoji)
// Template mengikuti Design System v5 "Prestige Destination" (style.css)

(function() {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // ---------- Ikon SVG ----------
  const ICON = {
    wa: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
    menu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    close: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    star: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    location: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    phone: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    mountain: '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20l6.5-12L13 15l3-4 6 9H2z"></path><circle cx="17" cy="5.5" r="2"></circle></svg>',
    heart: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
    heartFilled: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e11d48" stroke="#e11d48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
    user: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    globe: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    book: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    search: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'
  };

  // ---------- Fallback foto ----------
  // Foto pengganti bila file gambar tidak tersedia,
  // gradien navy-biru + ikon gunung + nama tempat
  function photoFallback(nama) {
    return `<div class="ph-fallback">${ICON.mountain}<span>${nama}</span></div>`;
  }

  function wilayahNama(id) {
    const w = WILAYAH.find((x) => x.id === id);
    return w ? w.nama : id;
  }

  // ---------- Navigasi & Status Pengguna ----------
  function initNav() {
    const btn = $('#btn-menu');
    const links = $('#nav-menu');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      const isOpen = links.classList.toggle('aktif');
      btn.innerHTML = isOpen ? ICON.close : ICON.menu;
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    $$('#nav-menu a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('aktif');
        btn.innerHTML = ICON.menu;
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    // Tombol Toggle Bahasa (ID / EN)
    const navRight = $('.nav-right');
    if (navRight) {
      const langSekarang = localStorage.getItem('sari_lang') || 'id';
      const btnLang = document.createElement('button');
      btnLang.className = 'btn btn-outline btn-nav-lang';
      btnLang.innerHTML = `${ICON.globe} <span>${langSekarang === 'id' ? 'EN' : 'ID'}</span>`;
      btnLang.title = 'Switch Language / Ganti Bahasa';
      btnLang.addEventListener('click', () => {
        const nextLang = (localStorage.getItem('sari_lang') || 'id') === 'id' ? 'en' : 'id';
        localStorage.setItem('sari_lang', nextLang);
        location.reload();
      });
      navRight.appendChild(btnLang);

      const token = localStorage.getItem('sari_token') || localStorage.getItem('sari_admin_token');
      const userRaw = localStorage.getItem('sari_user') || localStorage.getItem('sari_admin_user');
      let currentUser = null;
      if (token && userRaw) {
        try { currentUser = JSON.parse(userRaw); } catch (e) {}
      }

      if (currentUser) {
        const linkHref = currentUser.role === 'admin' ? 'admin.html' : (currentUser.role === 'kontributor' ? 'kontributor.html' : 'profile.html');
        const btnProfil = document.createElement('a');
        btnProfil.href = linkHref;
        btnProfil.className = 'btn btn-outline btn-nav-user';
        btnProfil.innerHTML = `${ICON.user} <span>${currentUser.nama ? currentUser.nama.split(' ')[0] : 'Profil'}</span>`;
        navRight.insertBefore(btnProfil, navRight.firstChild);
      } else {
        const btnMasuk = document.createElement('a');
        btnMasuk.href = 'login.html';
        btnMasuk.className = 'btn btn-outline btn-nav-login';
        btnMasuk.textContent = t('Masuk');
        navRight.insertBefore(btnMasuk, navRight.firstChild);
      }

      // Action items khusus mobile di dalam menu drawer
      if (links) {
        const divider = document.createElement('li');
        divider.className = 'nav-mobile-divider';
        links.appendChild(divider);

        const liAuth = document.createElement('li');
        liAuth.className = 'nav-mobile-action';
        if (currentUser) {
          const linkHref = currentUser.role === 'admin' ? 'admin.html' : (currentUser.role === 'kontributor' ? 'kontributor.html' : 'profile.html');
          liAuth.innerHTML = `<a href="${linkHref}" class="btn-mobile-auth">${ICON.user} <span>${currentUser.nama ? currentUser.nama.split(' ')[0] : 'Profil'}</span></a>`;
        } else {
          liAuth.innerHTML = `<a href="login.html" class="btn-mobile-auth">${ICON.user} <span>Masuk / Daftar</span></a>`;
        }
        links.appendChild(liAuth);

        const liWa = document.createElement('li');
        liWa.className = 'nav-mobile-action';
        liWa.innerHTML = `<a href="https://wa.me/6281234567890" target="_blank" rel="noopener" class="btn-mobile-wa">${ICON.wa} <span>Hubungi Kami</span></a>`;
        links.appendChild(liWa);
      }
    }
  }

  // ---------- Render Kartu Destinasi (v4: foto dominan) ----------
  function renderKartu(data, containerSel) {
    const container = $(containerSel);
    if (!container) return;

    container.innerHTML = data.map((d) => `
      <article class="card">
        <div class="card-photo">
          ${photoFallback(d.nama)}
          <img src="${d.gambar}" alt="${d.nama}" loading="lazy" onerror="this.remove()">
          <span class="card-badge">${d.kategori}</span>
          <div class="card-top-right">
            <span class="card-rate">${ICON.star} ${d.rating}</span>
            <button class="card-bookmark-btn btn-bookmark" onclick="event.stopPropagation(); appToggleBookmark('${d.id}', this)" title="${t('Simpan Favorit')}">
              ${ICON.heart}
            </button>
          </div>
        </div>
        <div class="card-body">
          <h3>${d.nama}</h3>
          <p class="desc">${d.deskripsi}</p>
          <div class="card-meta">${ICON.location} ${wilayahNama(d.wilayah)}</div>
          <div class="card-actions">
            <button class="btn-card dark" onclick="appBukaDetail('${d.id}')">${t('Lihat Detail')}</button>
            ${d.whatsapp
              ? `<a href="https://wa.me/${d.whatsapp}" target="_blank" rel="noopener" class="btn-card green">${ICON.wa} ${t('Hubungi')}</a>`
              : `<button class="btn-card green" disabled>${ICON.info} ${t('Tanpa Kontak')}</button>`}
          </div>
        </div>
      </article>
    `).join('');
  }

  // ---------- Filter Wilayah & Live Search ----------
  let filterWilayahAktif = 'semua';
  let keywordPencarian = '';

  function saringDestinasi() {
    let hasil = DESTINASI;
    if (filterWilayahAktif !== 'semua') {
      hasil = hasil.filter(d => d.wilayah === filterWilayahAktif);
    }
    if (keywordPencarian) {
      const q = keywordPencarian.toLowerCase();
      hasil = hasil.filter(d => 
        d.nama.toLowerCase().includes(q) ||
        d.deskripsi.toLowerCase().includes(q) ||
        (d.kategori && d.kategori.toLowerCase().includes(q))
      );
    }
    renderKartu(hasil, '#grid-destinasi');
    terapkanReveal($('#grid-destinasi'));
    const kosong = $('#kosong-pesan');
    if (kosong) kosong.style.display = hasil.length === 0 ? 'block' : 'none';
  }

  window.appFilterLive = (query) => {
    keywordPencarian = query.trim();
    const clearBtn = $('#search-clear-btn');
    if (clearBtn) {
      clearBtn.style.display = keywordPencarian.length > 0 ? 'flex' : 'none';
    }
    saringDestinasi();
  };

  window.appResetSearchInput = () => {
    const inp = $('#live-search-input');
    if (inp) {
      inp.value = '';
      inp.focus();
    }
    const clearBtn = $('#search-clear-btn');
    if (clearBtn) clearBtn.style.display = 'none';
    keywordPencarian = '';
    saringDestinasi();
  };

  window.appResetFilter = () => {
    filterWilayahAktif = 'semua';
    keywordPencarian = '';
    const inp = $('#live-search-input');
    if (inp) inp.value = '';
    const clearBtn = $('#search-clear-btn');
    if (clearBtn) clearBtn.style.display = 'none';
    const chips = $$('.filters .chip');
    chips.forEach((c) => c.classList.remove('aktif'));
    if (chips[0]) chips[0].classList.add('aktif');
    saringDestinasi();
  };

  function initFilter() {
    const filterBar = $('#filter-wilayah');
    const grid = $('#grid-destinasi');
    if (!filterBar || !grid) return;

    const tombolSemua = document.createElement('button');
    tombolSemua.className = 'chip aktif';
    tombolSemua.textContent = t('Semua Wilayah');
    tombolSemua.addEventListener('click', window.appResetFilter);
    filterBar.appendChild(tombolSemua);

    WILAYAH.forEach((w) => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.textContent = w.nama;
      chip.addEventListener('click', () => {
        $$('.filters .chip').forEach((c) => c.classList.remove('aktif'));
        chip.classList.add('aktif');
        filterWilayahAktif = w.id;
        saringDestinasi();
      });
      filterBar.appendChild(chip);
    });

    renderKartu(DESTINASI, '#grid-destinasi');
  }

  // ---------- Beranda ----------
  function renderBeranda() {
    if ($('#grid-beranda')) renderKartu(DESTINASI.slice(0, 6), '#grid-beranda');

    const gridEtika = $('#grid-etika-beranda');
    if (gridEtika) {
      gridEtika.innerHTML = BUDAYA.slice(0, 3).map((b) => etikaCard(b)).join('');
    }
  }

  // ---------- Kartu Etika (v4) ----------
  function etikaCard(b) {
    return `
      <div class="etika-card">
        <div class="etika-top">
          <div class="etika-ico">${ICON.info}</div>
          <h3>${b.judul}</h3>
        </div>
        <p>${b.ringkas}</p>
        <button class="link-more" onclick="appBukaEtika('${b.id}')">${t('Baca selengkapnya')} ${ICON.arrowRight}</button>
      </div>
    `;
  }

  // ---------- Detail ----------
  window.appBukaDetail = (id) => {
    const d = DESTINASI.find((x) => x.id === id);
    if (!d) return;

    if (location.pathname.includes('detail.html')) {
      renderDetailHalaman(d);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    location.href = `detail.html?id=${encodeURIComponent(id)}`;
  };

  // ---------- Detail & Galeri Lightbox ----------
  let currentLightboxImages = [];
  let currentLightboxIdx = 0;

  function ensureLightbox() {
    if ($('#lightbox-modal')) return;
    const lb = document.createElement('div');
    lb.className = 'lightbox-wrap';
    lb.id = 'lightbox-modal';
    lb.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" onclick="appTutupLightbox()" aria-label="${t('Tutup foto')}">${ICON.close}</button>
        <button class="lightbox-nav lightbox-prev" onclick="appNavLightbox(-1)" aria-label="${t('Foto sebelumnya')}">&#10094;</button>
        <img id="lightbox-main-img" class="lightbox-img" src="" alt="">
        <button class="lightbox-nav lightbox-next" onclick="appNavLightbox(1)" aria-label="${t('Foto berikutnya')}">&#10095;</button>
        <div id="lightbox-caption" class="lightbox-cap"></div>
        <div id="lightbox-counter" class="lightbox-counter"></div>
      </div>
    `;
    document.body.appendChild(lb);
    lb.addEventListener('click', (e) => {
      if (e.target === lb) appTutupLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('aktif')) return;
      if (e.key === 'Escape') appTutupLightbox();
      if (e.key === 'ArrowLeft') appNavLightbox(-1);
      if (e.key === 'ArrowRight') appNavLightbox(1);
    });
  }

  window.appBukaLightbox = (idx) => {
    ensureLightbox();
    const d = window.__currentDetailDestinasi;
    if (!d || !d.galeri || d.galeri.length === 0) return;
    currentLightboxImages = d.galeri;
    currentLightboxIdx = idx;
    updateLightbox();
    const lb = $('#lightbox-modal');
    if (lb) lb.classList.add('aktif');
    document.body.style.overflow = 'hidden';
  };

  window.appTutupLightbox = () => {
    const lb = $('#lightbox-modal');
    if (lb) lb.classList.remove('aktif');
    document.body.style.overflow = '';
  };

  window.appNavLightbox = (delta) => {
    if (!currentLightboxImages || currentLightboxImages.length === 0) return;
    currentLightboxIdx = (currentLightboxIdx + delta + currentLightboxImages.length) % currentLightboxImages.length;
    updateLightbox();
  };

  window.appPindahGaleri = (idx) => {
    const dots = document.querySelectorAll('.galeri-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('aktif', i === idx);
      dot.setAttribute('aria-pressed', String(i === idx));
    });
  };

  function updateLightbox() {
    const imgEl = $('#lightbox-main-img');
    const capEl = $('#lightbox-caption');
    const counterEl = $('#lightbox-counter');
    if (!imgEl) return;
    const curr = currentLightboxImages[currentLightboxIdx];
    if (!curr) return;
    imgEl.src = curr.src;
    imgEl.alt = curr.alt || '';
    if (capEl) capEl.textContent = curr.alt || '';
    if (counterEl) counterEl.textContent = `${t('Foto')} ${currentLightboxIdx + 1} / ${currentLightboxImages.length}`;
  }

  function renderBintang(r) {
    const round = Math.round(Number(r) || 5);
    let s = '';
    for (let i = 1; i <= 5; i++) {
      s += i <= round ? '★' : '☆';
    }
    return s;
  }

  function renderDaftarUlasan(list) {
    if (!list || list.length === 0) {
      return `<div style="text-align:center; padding:2rem 1.2rem; color:var(--muted); font-size:0.95rem; background:#ffffff; border-radius:var(--r-md); border:1.5px dashed var(--line);">
        ${t('Belum ada ulasan untuk tempat ini. Jadilah yang pertama membagikan ulasan dan penilaian Anda!')}
      </div>`;
    }
    return list.map((u) => {
      const inisial = (u.nama || 'P').charAt(0).toUpperCase();
      const tgl = u.tanggal || (u.created_at ? u.created_at.slice(0, 10) : '2026-11');
      return `
        <div class="review-card">
          <div class="review-card-top">
            <div class="review-author">
              <div class="review-avatar">${inisial}</div>
              <div class="review-author-name">${u.nama}</div>
            </div>
            <div class="review-meta-right">
              <div class="review-stars">${renderBintang(u.rating || 5)}</div>
              <span class="review-date">${tgl}</span>
            </div>
          </div>
          <p class="review-comment">${u.komentar}</p>
        </div>
      `;
    }).join('');
  }

  function renderDetailHalaman(d) {
    window.__currentDetailDestinasi = d;
    ensureLightbox();

    const etikaHtml = (d.budayaTerkait || [])
      .map((id) => {
        const b = BUDAYA.find((x) => x.id === id);
        return b ? `<span class="chip-soft">${b.judul}</span>` : '';
      })
      .join('');

    const aktivitasHtml = (d.aktivitas || [])
      .map((a) => `<span class="chip-soft">${a}</span>`)
      .join('');

    const detailParagraf = (d.detail || [d.deskripsi])
      .map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`)
      .join('');

    const sorotanHtml = (d.highlight || [])
      .map((h) => `<li>${ICON.check}<span>${h}</span></li>`)
      .join('');

    const galeriList = d.galeri || [];
    const galeriHtml = galeriList
      .map((g, idx) => `
        <div class="detail-galeri-slide" onclick="appBukaLightbox(${idx})" title="${g.alt || d.nama}">
          <img src="${g.src}" alt="${g.alt || d.nama}" loading="lazy">
          <div class="galeri-overlay"><span>${g.alt || d.nama}</span></div>
          <div class="galeri-zoom-badge" aria-hidden="true">${ICON.search}</div>
        </div>
      `)
      .join('');

    const galeriDotsHtml = galeriList.length > 1
      ? `<div class="galeri-dots" role="tablist" aria-label="${t('Navigasi Foto')}">${galeriList.map((_, i) => `<button class="galeri-dot${i === 0 ? ' aktif' : ''}" onclick="appPindahGaleri(${i})" aria-label="${t('Foto')} ${i + 1}" aria-pressed="${i === 0}"></button>`).join('')}</div>`
      : '';

    const waLink = d.whatsapp ? `https://wa.me/${d.whatsapp}` : '#';
    document.title = `${d.nama} — SARI`;

    // Tahap 3: Kirim ping kunjungan ke backend jika online
    fetch('/api/kunjungan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: d.id })
    }).catch(() => {});

    $('#detail-container').innerHTML = `
      <div class="detail-hero">
        ${photoFallback(d.nama)}
        <img src="${d.gambar}" alt="${d.nama}" onerror="this.remove()">
        <div class="detail-hero-cap">
          <h1>${d.nama}</h1>
          <div class="detail-meta">
            <span>${ICON.location} ${wilayahNama(d.wilayah)}</span>
            <span>${ICON.clock} ${d.jamBuka}</span>
            <span>${ICON.star} ${d.rating ? Number(d.rating).toFixed(1) : '5.0'}</span>
            <button onclick="appToggleBookmark('${d.id}', this)" class="btn-bookmark-detail" style="background:#fff; border:none; border-radius:var(--r-full); padding:0.35rem 0.9rem; font-size:0.85rem; font-weight:700; cursor:pointer; color:var(--navy); box-shadow:var(--sh-sm); margin-left:auto; display:inline-flex; align-items:center; gap:0.4rem;">
              ${ICON.heart} <span>${t('Simpan Favorit')}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="detail-grid">
        <div class="detail-content">
          <h2>${t('Tentang Tempat Ini')}</h2>
          ${detailParagraf}

          ${sorotanHtml ? `
          <h3>${t('Sorotan Utama')}</h3>
          <ul class="check-list">${sorotanHtml}</ul>
          ` : ''}

          ${aktivitasHtml ? `
          <h3>${t('Aktivitas Populer')}</h3>
          <div class="chip-line">${aktivitasHtml}</div>
          ` : ''}

          ${galeriHtml ? `
          <div style="margin-top:2.6rem;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.4rem;">
              <h3 style="margin:0;">${t('Galeri Foto & Dokumentasi')}</h3>
              <span style="font-size:0.82rem; color:var(--muted); font-weight:600;">${galeriList.length} ${t('Foto')}</span>
            </div>
            <p style="color:var(--muted); font-size:0.9rem; margin-bottom:1rem;">
              ${t('Geser foto ke samping atau klik untuk memperbesar dokumentasi tempat ini dalam resolusi tinggi.')}
            </p>
            <div class="detail-galeri-slider">
              <div class="detail-galeri-track">${galeriHtml}</div>
            </div>
            ${galeriDotsHtml}
          </div>
          ` : ''}

          ${etikaHtml ? `
          <div style="margin-top:2.6rem;">
            <h3>${t('Budaya & Etika Terkait')}</h3>
            <div class="chip-line">${etikaHtml}</div>
          </div>
          ` : ''}

          <!-- Seksi Ulasan & Rating Pengunjung -->
          <div class="reviews-section panel">
            <div class="reviews-header">
              <div>
                <h3 style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
                  ${ICON.star} <span>${t('Ulasan & Penilaian Wisatawan')}</span>
                </h3>
                <p style="color:var(--muted); font-size:0.92rem; margin:0;">
                  ${t('Pengalaman dan rekomendasi asli dari pengunjung yang telah menjelajahi tempat ini.')}
                </p>
              </div>
              <div class="rating-badge-large">
                <div class="score">${d.rating ? Number(d.rating).toFixed(1) : '5.0'}</div>
                <div>
                  <div class="stars">${renderBintang(d.rating || 5)}</div>
                  <div class="count" id="ulasan-count-badge">${(d.ulasan || []).length} ${t('Ulasan')}</div>
                </div>
              </div>
            </div>

            <div class="reviews-list" id="daftar-ulasan">
              ${renderDaftarUlasan(d.ulasan || [])}
            </div>

            <div class="write-review-card">
              <h4>${ICON.star} <span>${t('Tulis Ulasan Anda')}</span></h4>
              <p style="color:var(--muted); font-size:0.9rem; margin-bottom:1.1rem;">
                ${t('Ulasan Anda membantu wisatawan lain menghargai tempat ini dan mendukung ekonomi warga lokal.')}
              </p>
              <form id="form-ulasan" onsubmit="event.preventDefault(); appKirimUlasan('${d.id}');">
                <div class="review-form-row">
                  <input type="text" id="ulasan-nama" class="form-control" placeholder="${t('Nama Anda')}" required style="padding:0.75rem 0.95rem; border:1.5px solid var(--line); border-radius:var(--r-md); font-family:inherit; font-size:0.95rem; width:100%; box-sizing:border-box;">
                  <select id="ulasan-rating" style="padding:0.75rem 0.95rem; border:1.5px solid var(--line); border-radius:var(--r-md); font-family:inherit; font-size:0.92rem; font-weight:600; cursor:pointer; width:100%; box-sizing:border-box;">
                    <option value="5">★ 5 - ${t('Luar biasa')}</option>
                    <option value="4">★ 4 - ${t('Sangat bagus')}</option>
                    <option value="3">★ 3 - ${t('Bagus')}</option>
                    <option value="2">★ 2 - ${t('Cukup')}</option>
                    <option value="1">★ 1 - ${t('Kurang')}</option>
                  </select>
                </div>
                <textarea id="ulasan-komentar" rows="3" placeholder="${t('Ceritakan pengalaman Anda di tempat ini...')}" required style="width:100%; box-sizing:border-box; padding:0.75rem 0.95rem; border:1.5px solid var(--line); border-radius:var(--r-md); font-family:inherit; font-size:0.95rem; margin-bottom:0.8rem;"></textarea>
                <div id="ulasan-pesan" style="font-size:0.9rem; margin-bottom:0.8rem; display:none;"></div>
                <button type="submit" id="btn-submit-ulasan" class="btn btn-primary" style="padding:0.75rem 1.6rem; font-size:0.92rem;">
                  ${t('Kirim Ulasan')}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="sidebar">
          <div class="panel">
            <h3>${ICON.info} ${t('Informasi Praktis')}</h3>
            <div class="info-row">
              <span class="k">${t('Kategori')}</span>
              <span class="v">${d.kategori}</span>
            </div>
            <div class="info-row">
              <span class="k">${t('Waktu Terbaik')}</span>
              <span class="v">${d.waktuTerbaik || '-'}</span>
            </div>
            <div class="info-row">
              <span class="k">${t('Jam Buka')}</span>
              <span class="v">${d.jamBuka}</span>
            </div>
            <div class="info-row">
              <span class="k">${t('Tarif')}</span>
              <span class="v">${d.tarif}</span>
            </div>
            <div class="info-row">
              <span class="k">${t('Kontak')}</span>
              <span class="v">${d.kontak}</span>
            </div>
            <div class="info-row">
              <span class="k">${t('Cara Masuk')}</span>
              <span class="v">${d.caraMasuk}</span>
            </div>
            ${d.mapsUrl ? `
            <div class="info-row" style="margin-top:0.6rem; padding-top:0.6rem; border-top:1px dashed var(--line);">
              <span class="k">${t('Peta Lokasi')}</span>
              <div class="maps-embed-wrap">
                <iframe src="${d.mapsUrl.replace('maps.google.com/?q=', 'www.google.com/maps/embed/v1/place?key=&q=')}&output=embed" width="100%" height="160" style="border:0; border-radius:var(--r-md);" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <a href="${d.mapsUrl}" target="_blank" rel="noopener" style="margin-top:0.5rem; display:inline-block; color:var(--blue); font-weight:700; text-decoration:underline; font-size:0.88rem;">${ICON.mapPin} <span>${t('Buka di Google Maps')}</span></a>
              </div>
            </div>
            ` : ''}
          </div>

          <div class="panel">
            <h3>${ICON.check} ${t('Etika di Tempat Ini')}</h3>
            <p style="color: var(--muted); font-size: 0.93rem; line-height: 1.75; margin: 0;">${d.etika}</p>
          </div>

          <div class="side-actions">
            ${d.whatsapp
              ? `<a href="${waLink}" target="_blank" rel="noopener" class="btn-wa">${ICON.wa} ${t('Hubungi via WhatsApp')}</a>`
              : `<button class="btn-wa" disabled>${ICON.info} ${t('WhatsApp Tidak Tersedia')}</button>`}
            <button class="btn-back" onclick="history.back()">${t('Kembali')}</button>
          </div>
        </div>
      </div>
    `;

    // Ambil ulasan terbaru secara asynchronous dari backend
    fetch(`/api/ulasan?slug=${encodeURIComponent(d.id)}`)
      .then((res) => res.json())
      .then((list) => {
        if (Array.isArray(list) && list.length > 0) {
          d.ulasan = list.map((u) => ({
            id: u.id,
            nama: u.nama_pengunjung,
            rating: u.rating,
            komentar: u.komentar,
            tanggal: u.created_at ? u.created_at.slice(0, 10) : ''
          }));
          const container = $('#daftar-ulasan');
          if (container) container.innerHTML = renderDaftarUlasan(d.ulasan);
          const countBadge = $('#ulasan-count-badge');
          if (countBadge) countBadge.textContent = `${d.ulasan.length} ${t('Ulasan')}`;
        }
      })
      .catch(() => {});
  }

  function initDetail() {
    if (!location.pathname.includes('detail.html')) return;
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const container = $('#detail-container');

    if (!id) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>ID destinasi tidak ditemukan</h3>
          <p>Pilih salah satu destinasi dari halaman daftar.</p>
          <a href="destinasi.html" class="btn btn-primary" style="margin-top:1.25rem;">Kembali ke Destinasi</a>
        </div>
      `;
      return;
    }

    const d = DESTINASI.find((x) => x.id === id);
    if (!d) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>Destinasi tidak ditemukan</h3>
          <p>Destinasi yang Anda cari tidak ada atau telah dihapus.</p>
          <a href="destinasi.html" class="btn btn-primary" style="margin-top:1.25rem;">Kembali ke Destinasi</a>
        </div>
      `;
      return;
    }
    renderDetailHalaman(d);
    periksaStatusBookmark(d.id);

    // Auto-fill nama pengulas jika user sudah login
    const userRaw = localStorage.getItem('sari_user') || localStorage.getItem('sari_admin_user');
    if (userRaw) {
      try {
        const u = JSON.parse(userRaw);
        const inputNama = $('#ulasan-nama');
        if (inputNama && u.nama) {
          inputNama.value = u.nama;
        }
      } catch (e) {}
    }
  }

  // ---------- Bookmark / Favorit (Tahap 5) ----------
  window.appToggleBookmark = async (slug, btnEl) => {
    const token = localStorage.getItem('sari_token') || localStorage.getItem('sari_admin_token');
    if (!token) {
      alert('Silakan masuk (login) terlebih dahulu untuk menyimpan destinasi favorit Anda.');
      location.href = 'login.html';
      return;
    }

    try {
      const isSaved = btnEl.getAttribute('data-saved') === 'true';
      const method = isSaved ? 'DELETE' : 'POST';
      const url = isSaved ? '/api/bookmark/' + slug : '/api/bookmark';
      const body = isSaved ? null : JSON.stringify({ slug });

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Gagal mengubah favorit');

      btnEl.setAttribute('data-saved', j.saved ? 'true' : 'false');
      if (btnEl.classList.contains('btn-bookmark-detail')) {
        btnEl.innerHTML = `${j.saved ? ICON.heartFilled : ICON.heart} <span>${j.saved ? 'Tersimpan di Favorit' : 'Simpan Favorit'}</span>`;
      } else {
        btnEl.innerHTML = j.saved ? ICON.heartFilled : ICON.heart;
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Sinkronisasi status bookmark saat memuat halaman detail
  async function periksaStatusBookmark(slug) {
    const token = localStorage.getItem('sari_token') || localStorage.getItem('sari_admin_token');
    if (!token) return;
    try {
      const res = await fetch('/api/bookmark', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (!res.ok) return;
      const list = await res.json();
      const ditemukan = list.some(b => b.slug === slug);
      const btn = $('.btn-bookmark-detail');
      if (btn && ditemukan) {
        btn.setAttribute('data-saved', 'true');
        btn.innerHTML = `${ICON.heartFilled} <span>Tersimpan di Favorit</span>`;
      }
    } catch (e) {}
  }
  window.appKirimUlasan = async (slug) => {
    const inputNama = $('#ulasan-nama');
    const selectRating = $('#ulasan-rating');
    const inputKomentar = $('#ulasan-komentar');
    const pesan = $('#ulasan-pesan');
    const btn = $('#btn-submit-ulasan');

    const nama = inputNama ? inputNama.value.trim() : '';
    const rating = selectRating ? parseInt(selectRating.value, 10) : 5;
    const komentar = inputKomentar ? inputKomentar.value.trim() : '';
    if (!nama || !komentar) return;

    if (btn) btn.disabled = true;
    if (pesan) {
      pesan.style.display = 'block';
      pesan.style.color = 'var(--muted)';
      pesan.textContent = t('Mengirim ulasan...');
    }

    try {
      const res = await fetch('/api/ulasan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, nama_pengunjung: nama, rating, komentar })
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || t('Gagal mengirim ulasan'));

      if (pesan) {
        pesan.textContent = j.pesan || t('Terima kasih! Ulasan Anda berhasil diterbitkan.');
        pesan.style.color = '#10b981';
      }
      if (inputKomentar) inputKomentar.value = '';

      // Tampilkan langsung di daftar ulasan pengunjung tanpa perlu reload!
      const baru = j.ulasan || {
        nama,
        rating,
        komentar,
        tanggal: new Date().toISOString().slice(0, 10)
      };

      const d = DESTINASI.find((x) => x.id === slug);
      if (d) {
        if (!d.ulasan) d.ulasan = [];
        d.ulasan.unshift(baru);
        const container = $('#daftar-ulasan');
        if (container) container.innerHTML = renderDaftarUlasan(d.ulasan);
        const countBadge = $('#ulasan-count-badge');
        if (countBadge) countBadge.textContent = `${d.ulasan.length} ${t('Ulasan')}`;
      }
    } catch (err) {
      if (pesan) {
        pesan.textContent = t('Gagal: ') + err.message;
        pesan.style.color = '#ef4444';
      }
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  // ---------- Modal Etika ----------
  function ensureModal() {
    if ($('#modal-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'modal-wrap';
    wrap.id = 'modal-wrap';
    wrap.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button class="modal-x" aria-label="Tutup">${ICON.close}</button>
        <h3 id="modal-title"></h3>
        <p id="modal-body"></p>
      </div>
    `;
    document.body.appendChild(wrap);

    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) closeModal();
    });
    wrap.querySelector('.modal-x').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function openModal(title, body) {
    ensureModal();
    $('#modal-title').textContent = title;
    $('#modal-body').textContent = body;
    $('#modal-wrap').classList.add('aktif');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const wrap = $('#modal-wrap');
    if (!wrap) return;
    wrap.classList.remove('aktif');
    document.body.style.overflow = '';
  }

  window.appBukaEtika = (id) => {
    const b = BUDAYA.find((x) => x.id === id);
    if (!b) return;
    openModal(b.judul, b.detail);
  };

  // Kamus terjemahan bilingual komprehensif (ID <-> EN)
  const TRANSLATIONS = {
    en: {
      // Navigasi & Brand
      'Destinasi Lokal': 'Local Destinations',
      'Etika Budaya': 'Cultural Etiquette',
      'Kalender Agama': 'Sacred Calendar',
      'Tentang SARI': 'About SARI',
      'Masuk': 'Login',
      'Masuk / Daftar': 'Login / Register',
      'Profil': 'Profile',
      'Hubungi Kami': 'Contact Us',
      'Hapus pencarian': 'Clear search',
      'Semua Wilayah': 'All Regions',
      'Lihat Detail': 'View Details',
      'Hubungi': 'Contact',
      'Tanpa Kontak': 'No Contact',
      'Reset Filter': 'Reset Filter',
      'Tidak ada destinasi': 'No destinations found',
      'Coba pilih wilayah lain atau klik "Semua Wilayah".': 'Try selecting another region or click "All Regions".',
      'Baca selengkapnya': 'Read more',
      'Kembali': 'Back',
      'Kembali ke Destinasi': 'Back to Destinations',

      // Hero & Headline Beranda
      'Inti Bali yang Sebenarnya': 'The Real Essence of Bali',
      'Wisata Lokal Bali': 'Bali Local Tourism',
      'Temukan Bali Asli, Di Luar Zona Padat': 'Discover Authentic Bali, Beyond Crowded Zones',
      'Destinasi dikelola warga, panduan etika budaya, dan kontak langsung tanpa perantara. Dirancang untuk wisatawan yang ingin menghormati adat dan membuat uangnya berdampak.': 'Locally managed destinations, cultural etiquette guides, and direct contacts without middlemen. Designed for travelers who respect local heritage and want their spending to create real impact.',
      'Jelajahi Destinasi': 'Explore Destinations',
      'Pelajari Etika Budaya': 'Learn Cultural Etiquette',
      'Destinasi Lokal': 'Local Destinations',
      'Wilayah Bali': 'Bali Regions',
      'Komisi Perantara': 'Intermediary Fee',
      'Mengapa SARI': 'Why SARI',
      'Wisata yang Berarti untuk Semua': 'Tourism that Matters to Everyone',
      'SARI menghubungkan wisatawan dengan keaslian Bali, sambil mendistribusikan manfaat pariwisata ke seluruh pelosok Pulau Dewata.': 'SARI connects travelers with authentic Bali while distributing tourism benefits across the entire Island of the Gods.',
      'Untuk Warga Lokal': 'For Local Communities',
      'Destinasi kecil di luar zona padat mendapat visibilitas. Uang pariwisata mengalir langsung ke warga, tanpa komisi perantara.': 'Small destinations outside crowded corridors gain visibility. Tourism spending flows directly to villagers with zero commission.',
      'Panduan busana masuk pura, canang sari, aturan Nyepi, dan frasa Bahasa Bali agar kunjungan Anda penuh hormat.': 'Temple dress codes, canang sari etiquette, Nyepi rules, and basic Balinese phrases to ensure your visit is genuinely respectful.',
      'Ringan & Tanpa Login': 'Lightweight & No Login',
      'Buka langsung di browser. Tanpa instalasi, tanpa iklan, dan tanpa pengumpulan data pribadi. Cepat bahkan di jaringan 4G.': 'Open directly in your browser. No app install, no ads, and no personal data tracking. Fast even on 4G networks.',
      'Destinasi Unggulan': 'Featured Destinations',
      'Tempat Tenang yang Layak Dikunjungi': 'Peaceful Places Worth Exploring',
      'Pilihan destinasi lokal dengan pemandangan indah, pengelola warga, dan suasana yang jauh dari keramaian.': 'Curated local spots with pristine scenery, community hosts, and a serene ambiance far from tourist congestion.',
      'Lihat Semua Destinasi': 'View All Destinations',
      'Hormati Adat Bali Sebelum Berangkat': 'Respect Balinese Customs Before You Go',
      'Sedikit pemahaman membuat kunjungan Anda lebih bermakna dan dihormati warga setempat.': 'A little cultural understanding makes your journey far more meaningful and appreciated by local residents.',
      'Lihat Semua Panduan Etika': 'View All Etiquette Guides',
      'Siap Menjelajah Bali yang Sejati?': 'Ready to Explore Authentic Bali?',
      'Lihat kalender hari suci sebelum merencanakan perjalanan, agar kunjungan Anda tepat waktu dan penuh hormat.': 'Consult the sacred calendar before planning your journey to ensure a well-timed and respectful visit.',
      'Cek Kalender Hari Suci': 'Check Sacred Calendar',

      // Halaman Destinasi
      'Wisata Lokal Bali': 'Bali Local Tourism',
      'Destinasi kecil di luar zona padat yang dikelola warga. Setiap kunjungan Anda langsung mendukung ekonomi desa.': 'Small local community destinations beyond crowded corridors. Every visit directly sustains the village economy.',
      'Jelajahi Bali di Luar Zona Padat': 'Explore Bali Beyond Crowded Zones',
      'Kumpulan destinasi autentik yang dikelola warga lokal. Dilengkapi etika adat, jam buka, dan kontak WhatsApp langsung.': 'A curated collection of authentic destinations managed by locals. Featuring cultural guidelines, operating hours, and direct WhatsApp contacts.',
      'Cari destinasi, pura, pantai, air terjun...': 'Search destinations, temples, beaches, waterfalls...',
      'Tidak ada destinasi yang cocok dengan pencarian Anda.': 'No destinations match your search criteria.',
      'Coba kata kunci lain atau klik': 'Try another keyword or click',

      // Halaman Etika
      'Hormati Adat Bali': 'Respect Balinese Customs',
      'Panduan lengkap agar kunjungan Anda nyaman, menghormati norma lokal, dan tidak menjadi beban bagi warga.': 'A comprehensive guide to make your visit welcoming, harmonious with local norms, and uplifting for communities.',
      'Siap Kunjungan yang Penuh Hormat?': 'Ready for a Respectful Visit?',
      'Lihat destinasi lokal dan terapkan etika yang telah Anda pelajari di setiap perhentian.': 'Explore local destinations and apply what you have learned at every stop.',
      'Lihat Destinasi Lokal': 'View Local Destinations',

      // Halaman Kalender & Sejarah
      'Kalender Hari Suci Bali': 'Calendar of Sacred Balinese Days',
      'Tahu kapan hari suci, apa yang tutup, dan saran bagi wisatawan agar tidak kaget saat tiba di lokasi.': 'Learn when sacred ceremonies take place, what closures occur, and travel advice so you are well-prepared.',
      'Hari Suci': 'Sacred Day',
      'Tanggal': 'Date',
      'Makna': 'Meaning',
      'Panduan Wisatawan': 'Traveler Guidelines',
      'Sejarah & Asal-Usul Ritual:': 'History & Sacred Ritual Origins:',
      'Penting: Hari Nyepi': 'Important: Nyepi Day of Silence',
      'Pada Hari Nyepi, seluruh aktivitas di Bali berhenti selama 24 jam. Tidak ada penerbangan, tidak ada aktivitas di jalan, dan lampu harus redup. Wisatawan diharapkan tinggal di dalam akomodasi dan mematuhi aturan setempat.': 'On Nyepi, all outdoor activities across Bali cease completely for 24 hours. No flights, no traffic, and lights must remain off or dimmed. Travelers are expected to stay inside their accommodation and comply with local village rules.',

      // Halaman Tentang SARI
      'Siapa Kami, Untuk Siapa': 'Who We Are, Who It Is For',
      'Sebuah proyek sosial kecil untuk membiarkan Bali yang sejati ditemukan — tanpa komisi, tanpa login, tanpa iklan.': 'A grassroots social project allowing the true Bali to be discovered — zero commission, no login, no ads.',
      'Tentang Kami': 'About Us',
      'SARI untuk Bali': 'SARI for Bali',
      'SARI adalah aplikasi web statis yang menyajikan informasi wisata lokal Bali di luar zona padat, dilengkapi panduan etika budaya bagi wisatawan. Nama SARI diambil dari kata yang berarti inti atau bunga, sekaligus singkatan:': 'SARI is a static web application highlighting authentic local destinations beyond crowded zones, accompanied by cultural etiquette guidance. The name SARI draws from the Indonesian word for essence or flower, as well as an acronym:',
      'Seni': 'Art & Craft',
      'Kerajinan tangan, tari, musik, dan seni budaya Bali yang hidup di destinasi lokal.': 'Living handicrafts, sacred dances, gamelan music, and arts flourishing in local communities.',
      'Adat': 'Customs & Tradition',
      'Tradisi, upacara, dan norma kehidupan masyarakat Bali yang perlu dihormati wisatawan.': 'Sacred traditions, temple ceremonies, and community norms that travelers should honor.',
      'Rasa': 'Taste & Flavor',
      'Kuliner lokal, warung warga, dan keaslian cita rasa di luar zona komersial.': 'Authentic culinary heritage, family-owned warungs, and true flavors beyond commercial strips.',
      'Indonesia': 'Indonesia',
      'Identitas bangsa yang dikembangkan melalui wisata bertanggung jawab di Bali.': 'National heritage fostered through sustainable and conscious travel across Bali.',
      'Tujuan SARI': 'Objectives of SARI',
      'Mengarahkan wisatawan ke destinasi lokal kecil di luar zona padat.': 'Guide travelers to small, authentic local spots outside congested corridors.',
      'Meredam kepadatan wisatawan di zona selatan yang menyebabkan kemacetan.': 'Ease overtourism in southern Bali that strains infrastructure and nature.',
      'Membantu uang pariwisata sampai langsung kepada pengusaha kecil dan warga, tanpa komisi.': 'Ensure tourism spending flows directly to family businesses and local residents without commissions.',
      'Mengurangi konflik budaya melalui edukasi etika wisatawan.': 'Prevent cultural misunderstandings through proactive traveler etiquette education.',
      'Keunggulan SARI': 'Key Highlights of SARI',
      'Tanpa login dan tanpa pendaftaran': 'No login or account registration required',
      'Tanpa instalasi aplikasi, buka langsung di browser': 'No app download needed, runs instantly in any modern browser',
      'Tanpa iklan dan tanpa pengumpulan data pribadi': 'Zero advertisements and no personal data harvesting',
      'Tanpa komisi transaksi antara wisatawan dan warga': 'Zero commission fees on interactions between visitors and locals',
      'Ringan dan cepat diakses di jaringan 4G': 'Ultralight and fast on cellular 4G networks',

      // Halaman Detail Destinasi
      'Detail Destinasi': 'Destination Details',
      'Peta Lokasi': 'Location Map',
      'Buka Google Maps': 'Open in Google Maps',
      'Simpan Favorit': 'Save Favorite',
      'Tersimpan di Favorit': 'Saved to Favorites',
      'Tentang Tempat Ini': 'About This Place',
      'Sorotan Utama': 'Key Highlights',
      'Aktivitas Populer': 'Popular Activities',
      'Galeri Foto & Dokumentasi': 'Photo & Documentation Gallery',
      'Galeri Foto': 'Photo Gallery',
      'Foto': 'Photos',
      'Klik foto mana saja untuk memperbesar dokumentasi tempat ini dalam resolusi tinggi.': 'Click on any photo to enlarge high-resolution documentation.',
      'Geser foto ke samping atau klik untuk memperbesar dokumentasi tempat ini dalam resolusi tinggi.': 'Swipe photos sideways or click to enlarge high-resolution documentation.',
      'Navigasi Foto': 'Photo Navigation',
      'Tutup foto': 'Close photo',
      'Foto sebelumnya': 'Previous photo',
      'Foto berikutnya': 'Next photo',
      'Budaya & Etika Terkait': 'Related Culture & Etiquette',
      'Informasi Praktis': 'Practical Information',
      'Kategori': 'Category',
      'Waktu Terbaik': 'Best Time to Visit',
      'Jam Buka': 'Opening Hours',
      'Tarif': 'Admission Fee',
      'Kontak': 'Contact',
      'Cara Masuk': 'Access Route',
      'Etika di Tempat Ini': 'Etiquette at This Place',
      'Hubungi via WhatsApp': 'Contact via WhatsApp',
      'WhatsApp Tidak Tersedia': 'WhatsApp Unavailable',
      'Peta Lokasi': 'Location Map',
      'Buka di Google Maps': 'Open in Google Maps',

      // Ulasan & Rating
      'Ulasan & Penilaian Wisatawan': 'Visitor Reviews & Ratings',
      'Pengalaman dan rekomendasi asli dari pengunjung yang telah menjelajahi tempat ini.': 'Real experiences and authentic ratings from travelers who have explored this place.',
      'Ulasan': 'Reviews',
      'Belum ada ulasan untuk tempat ini. Jadilah yang pertama membagikan ulasan dan penilaian Anda!': 'No reviews yet for this place. Be the first to share your thoughts and rating!',
      'Tulis Ulasan Anda': 'Write Your Review',
      'Ulasan Anda membantu wisatawan lain menghargai tempat ini dan mendukung ekonomi warga lokal.': 'Your feedback helps other travelers appreciate this place and supports the local community.',
      'Nama Anda': 'Your Name',
      'Ceritakan pengalaman Anda di tempat ini...': 'Share your experience at this place...',
      'Kirim Ulasan': 'Submit Review',
      'Luar biasa': 'Excellent',
      'Sangat bagus': 'Very Good',
      'Bagus': 'Good',
      'Cukup': 'Average',
      'Kurang': 'Poor',
      'Mengirim ulasan...': 'Submitting review...',
      'Terima kasih! Ulasan Anda berhasil diterbitkan.': 'Thank you! Your review has been published.',
      'Gagal mengirim ulasan': 'Failed to submit review',

      // Footer
      'Inti seni, adat, dan rasa Bali untuk wisatawan bijak.': 'The essence of Balinese art, customs, and taste for mindful travelers.',
      'Inti seni, adat, dan rasa Bali untuk wisatawan bijak. Aplikasi web statis wisata lokal tanpa komisi, tanpa login, tanpa iklan.': 'The essence of Balinese art, customs, and taste for mindful travelers. Static web app with zero commissions, no login, and no ads.',
      'Halaman': 'Pages',
      'Beranda': 'Home',
      'Kontak': 'Contact',
      'Ikuti Kami': 'Follow Us',
      '© 2026 SARI — Wisata Lokal Bali.': '© 2026 SARI — Bali Local Tourism.',
      '© 2026 SARI — Wisata Lokal Bali. Dibuat sebagai proyek sosial tanpa komisi.': '© 2026 SARI — Bali Local Tourism. Created as a non-commercial social project.'
    }
  };

  // Terjemahan data dinamis (Etika, Kalender, Destinasi, Wilayah) saat bahasa Inggris aktif
  const DATA_TRANSLATION_EN = {    wilayah: {
      'semua': 'All Regions',
      'karangasem': 'Karangasem',
      'buleleng': 'Buleleng',
      'tabanan': 'Tabanan',
      'gianyar': 'Gianyar',
      'bangli': 'Bangli',
      'jembrana': 'Jembrana'
    },
    destinasi: {
      'amed-pantai': {
        nama: 'Amed Beach',
        kategori: 'Coastal & Diving',
        deskripsi: 'Black sand coast with calm waters, vibrant coral reefs close to shore, and views of Mount Agung.',
        detail: [
          'Amed is a serene stretch of coastal fishing villages in East Bali, known for traditional jukung boats lining the black volcanic sand shore.',
          'Unlike the crowded beaches of South Bali, Amed offers an unhurried rhythm of life with clear sea waters ideal for snorkeling directly from the shore.'
        ],
        highlight: [
          'Snorkeling directly from the beach to coral reefs',
          'Traditional fishing jukung boat morning excursions',
          'Stunning sunrise with silhouette of Mount Agung'
        ],
        aktivitas: ['Snorkeling', 'Freediving', 'Traditional Fishing', 'Sunrise Watching'],
        waktuTerbaik: 'April - October (Dry Season)',
        jamBuka: 'Open 24 hours (Best: 06:00 - 18:00)',
        tarif: 'Free beach access (Snorkel rental: ~Rp 35,000)',
        caraMasuk: 'Smooth paved coastal road, accessible by car and scooter',
        etika: 'Do not step on live coral reefs while swimming. Respect local fishermen when launching boats at dawn.'
      },
      'tirta-gangga': {
        nama: 'Tirta Gangga Water Palace',
        kategori: 'Royal Heritage & Springs',
        deskripsi: 'Historic royal water palace of Karangasem Kingdom with sacred pools, fountains, and stepping stone paths.',
        detail: [
          'Built in 1946 by the late King of Karangasem, Anak Agung Anglurah Ketut Karangasem, this water garden blends Balinese and Chinese architectural styles.',
          'Natural holy springs feed the pools where giant koi fish swim gracefully around stone statues and carved fountains.'
        ],
        highlight: [
          'Walk across stepping stones above crystal-clear spring water',
          'Feeding giant koi fish in royal ponds',
          'Historic eleven-tiered lotus fountain'
        ],
        aktivitas: ['Stepping Stones Walk', 'Koi Fish Feeding', 'Historical Photography', 'Spring Bathing'],
        waktuTerbaik: 'Morning before 09:00 or late afternoon',
        jamBuka: '06:00 - 19:00 WITA',
        tarif: 'Rp 50,000 / adult (International) - Rp 25,000 (Domestic)',
        caraMasuk: 'Main road from Amlapura city, large parking lot available',
        etika: 'Dress politely covering shoulders and knees. Do not step or climb onto sacred water statues.'
      },
      'pura-lempuyang': {
        nama: 'Pura Luhur Lempuyang',
        kategori: 'Sacred Temple',
        deskripsi: 'One of Bali holiest sanctuaries (Sad Kahyangan) perched on Mount Lempuyang facing Mount Agung.',
        detail: [
          'Pura Lempuyang Luhur is an ancient mountain sanctuary dedicated to Ida Sang Hyang Widhi Wasa in manifestation as Iswara, guardian of the east.',
          'The iconic split gateway (Candi Bentar) frames Mount Agung in the distance, offering a deeply spiritual panorama.'
        ],
        highlight: [
          'Iconic Candi Bentar split gate framing Mount Agung',
          'Sacred dragon staircase (Naga stairs)',
          'Tranquil pilgrimage route through mountain cloud forest'
        ],
        aktivitas: ['Cultural Pilgrimage', 'Temple Architecture Observation', 'Panoramic Photography'],
        waktuTerbaik: 'Early morning 06:00 - 08:30 for clear mountain views',
        jamBuka: '06:00 - 19:00 WITA',
        tarif: 'Rp 55,000 / person (includes temple sarong shuttle)',
        caraMasuk: 'Mountain road via Abang, Karangasem. Shuttle mini-bus from parking base.',
        etika: 'Must wear traditional sarong and waist sash. Maintain quiet reverent demeanor; refrain from intrusive posing.'
      },
      'lovina-pantai': {
        nama: 'Lovina Beach',
        kategori: 'Coastal & Wildlife',
        deskripsi: 'Tranquil black sand coast in North Bali renowned for wild dolphins at sunrise and laid-back ambiance.',
        detail: [
          'Lovina spans a string of peaceful fishing hamlets along Bali northern shore in Buleleng Regency.',
          'At dawn, local outrigger motorized boats gently head out to sea where pods of spinner and spotted dolphins leap in their natural habitat.'
        ],
        highlight: [
          'Wild dolphin watching at sunrise',
          'Calm and gentle sea waters perfect for relaxing swims',
          'Authentic local seafood warungs along the coast'
        ],
        aktivitas: ['Dolphin Watching Tour', 'Coastal Snorkeling', 'Sunset Strolling', 'Local Seafood Dining'],
        waktuTerbaik: 'Early dawn 05:30 - 08:00 (Dolphin tour)',
        jamBuka: 'Open 24 hours',
        tarif: 'Free beach access (~Rp 100,000/person for shared boat tour)',
        caraMasuk: 'North coastal highway via Singaraja, easy access',
        etika: 'Ensure boat captain maintains respectful distance from dolphins without encircling or chasing them aggressively.'
      },
      'gitgit-airterjun': {
        nama: 'Gitgit Waterfall',
        kategori: 'Waterfalls & Rainforest',
        deskripsi: 'The tallest waterfall in North Bali cascading 40 meters down a lush tropical gorge surrounded by clove trees.',
        detail: [
          'Located in Sukasada, Buleleng, Gitgit Waterfall plunges through dense rainforest into a natural rock pool below.',
          'The scenic walking trail passes fragrant clove, coffee, and vanilla spice gardens cultivated by local village families.'
        ],
        highlight: [
          '40-meter thunderous cascade in tropical gorge',
          'Refreshing natural pool mist',
          'Scenic rainforest nature trail with spice trees'
        ],
        aktivitas: ['Rainforest Trekking', 'Waterfall Photography', 'Cool Mist Relaxation'],
        waktuTerbaik: 'Morning 08:00 - 11:00',
        jamBuka: '07:00 - 17:00 WITA',
        tarif: 'Rp 20,000 / person',
        caraMasuk: 'Bedugul - Singaraja highway, followed by 500m paved walking steps down to gorge',
        etika: 'Wear comfortable walking footwear with good grip. Do not litter along the mountain trail.'
      },
      'jatiluwih-sawah': {
        nama: 'Jatiluwih Rice Terraces',
        kategori: 'UNESCO Cultural Landscape',
        deskripsi: 'Sprawling emerald green rice terraces preserved by the centuries-old Subak cooperative irrigation system.',
        detail: [
          'Designated a UNESCO World Heritage cultural landscape, Jatiluwih encompasses over 600 hectares of cascading terraced rice paddies.',
          'The terraces are managed according to Tri Hita Karana, balancing spiritual harmony between God, humanity, and nature.'
        ],
        highlight: [
          'Endless rolling green terraces under Mount Batukaru',
          'Centuries-old Subak canal and bamboo water gates',
          'Marked walking and cycling trails through the fields'
        ],
        aktivitas: ['Ricefield Trekking', 'Landscape Photography', 'Subak Organic Farming Tour', 'Village Cycling'],
        waktuTerbaik: 'Morning 07:00 - 10:00 or late afternoon 15:30 - 17:30',
        jamBuka: '06:30 - 18:00 WITA',
        tarif: 'Rp 40,000 / adult (Domestic) - Rp 50,000 (International)',
        caraMasuk: 'Mountain road Tabanan via Penebel, scenic panoramic drive',
        etika: 'Walk only on designated trails and stone bunds. Never step on or trample growing rice crops.'
      },
      'pura-batukaru': {
        nama: 'Pura Luhur Batukaru',
        kategori: 'Ancient Forest Sanctuary',
        deskripsi: 'Mystical moss-clad mountain temple nestled inside ancient rainforest on the southern slopes of Mount Batukaru.',
        detail: [
          'One of Bali directional temples (Sad Kahyangan), Pura Batukaru protects the island from negative energies arising from the west.',
          'Surrounded by towering trees and perpetual mountain mist, the shrines are covered in velvety green moss, evoking timeless serenity.'
        ],
        highlight: [
          'Multi-tiered Meru shrines enveloped by sacred moss',
          'Sacred spring lake and lotus sanctum',
          'Unrivaled quietude away from tourist commercialization'
        ],
        aktivitas: ['Spiritual Contemplation', 'Ancient Architecture Appreciation', 'Rainforest Nature Walk'],
        waktuTerbaik: 'Morning 08:00 - 11:00 before afternoon mountain rain',
        jamBuka: '08:00 - 18:00 WITA',
        tarif: 'Rp 30,000 / person',
        caraMasuk: 'Penebel Tabanan route, winding scenic mountain road',
        etika: 'Sarong and sash required at all times. Maintain profound silence inside inner sanctum courtyards.'
      },
      'sidemen-sawah': {
        nama: 'Sidemen Valley',
        kategori: 'Rural Culture & Valley',
        deskripsi: 'Idyllic emerald valley in Karangasem with terraced paddies, traditional weaving ateliers, and Mount Agung views.',
        detail: [
          'Sidemen captures the nostalgic, authentic essence of Bali from decades past, tucked into an expansive valley along the Unda River.',
          'Local village women continue the time-honored craft of handweaving intricate Songket and Endek textiles on wooden looms beneath their porches.'
        ],
        highlight: [
          'Breathtaking views of Mount Agung rising above the valley',
          'Traditional handloom textile weaving workshops',
          'Gentle walks along rural irrigation trails and riverbanks'
        ],
        aktivitas: ['Valley Walking', 'Songket & Endek Weaving Workshops', 'Herbal Tea & Cooking Class', 'River Strolling'],
        waktuTerbaik: 'All year round; sunrise and mornings offer clearest skies',
        jamBuka: 'Open 24 hours',
        tarif: 'Free village exploration (workshops vary ~Rp 50,000 - 150,000)',
        caraMasuk: 'Via Klungkung or Rendang Karangasem, smooth scenic drive',
        etika: "Smile and greet villagers courteously ('Om Swastiastu'). Ask before taking portraits of weavers at work."
      }
    },
    budaya: {
      'busana-pura': {
        judul: 'Temple Attire Guidelines',
        ringkas: 'Sarong (kain kamen) and sash for women, traditional long wrap for men.',
        detail: 'The traditional sarong wrap must cover below knees, paired with a waist sash (selendang). Avoid sleeveless tops, tank tops, and short skirts in sacred temple grounds. Sarongs are typically available for rent or borrow at temple entrance gates.'
      },
      'canang-sari': {
        judul: 'Canang Sari Offerings',
        ringkas: 'Small daily woven palm-leaf offerings with fresh flowers on paths and doorways.',
        detail: 'Never step over, kick, or stand on canang sari placed on walkways or staircases. If taking close-up photographs, always ask permission from nearby residents or temple caretakers first.'
      },
      'nyepi': {
        judul: 'Nyepi Day of Silence',
        ringkas: 'Balinese Saka New Year: total island-wide cessation of activities for 24 hours.',
        detail: 'During Catur Brata Penyepian: no fires or lights (Amati Geni), no physical work (Amati Karya), no traveling outdoors (Amati Lelungan), and no revelry or loud entertainment (Amati Lelanguan). Hotel guests must remain strictly inside resort premises.'
      },
      'basa-bali': {
        judul: 'Basic Balinese Phrases',
        ringkas: 'Simple polite words to show genuine respect to local community members.',
        detail: 'Om Swastiastu (peaceful greeting), Matur Suksma (thank you very much), Bli (courteous address for men/brothers), Mbok (courteous address for women/sisters).'
      },
      'adat-laut': {
        judul: 'Marine & Fishing Customs',
        ringkas: 'Respect holy marine ecosystems and local traditional fishing traditions.',
        detail: 'Never litter into the ocean and avoid stepping on live coral reefs while swimming or diving. When hiring fishing jukung boats, strictly follow instructions provided by local captains.'
      },
      'pantang-larang-desa': {
        judul: 'Village Sanctuary Rules',
        ringkas: 'Specific sacred village zones have localized customary restrictions at certain times.',
        detail: 'Always check entrance announcement boards near customary villages (Desa Adat). When holy ceremonies are in progress, maintain a respectful distance and refrain from flash photography.'
      }
    },
    kalender: {
      'Nyepi': {
        nama: 'Nyepi (Day of Silence)',
        tanggal: 'Based on Balinese Saka Lunar Calendar (usually March–April)',
        keterangan: 'Island-wide Day of Silence; all outdoor activity in Bali pauses for 24 hours.',
        saran: 'Stay inside accommodation, dim lights, and do not make noise or step out to public streets.',
        sejarah: 'Nyepi marks the beginning of the Saka Hindu New Year founded in 78 CE, commemorating peaceful reconciliation among ancient kingdoms by King Kaniska I. In Bali, Nyepi evolved into a profound purification of the macrocosmos (Bhuana Agung) and human soul (Bhuana Alit) through four sacred abstinences (Catur Brata Penyepian). On the eve of Nyepi, Tawur Kesanga purification rituals and lively Ogoh-ogoh effigy parades take place to neutralize negative energies (Bhuta Kala).'
      },
      'Galungan': {
        nama: 'Galungan Festival',
        tanggal: 'Every 210 days (Balinese 210-day Pawukon cycle)',
        keterangan: 'Celebration of Dharma (virtue) victory over Adharma (unrighteousness).',
        saran: 'Temples are vibrant and lively; locals wear full traditional ceremonial attire.',
        sejarah: 'Galungan celebrates the eternal triumph of virtue (Dharma) over cosmic unrighteousness (Adharma). First recorded officially on Purnama Kapat in 882 CE during King Sri Jayakasunu\'s reign after divine guidance to alleviate plagues. Magnificent curving bamboo poles (penjor) adorned with young coconut fronds, rice stalks, and harvest produce line every roadside as symbolic representations of sacred Mount Agung and dragons of prosperity.'
      },
      'Kuningan': {
        nama: 'Kuningan Ceremony',
        tanggal: '10 days following Galungan Day',
        keterangan: 'The sacred farewell day as ancestral spirits return to the heavenly realm.',
        saran: 'Peaceful and reflective atmosphere. Excellent time to observe family altar rituals with reverence.',
        sejarah: 'Kuningan falls exactly ten days after Galungan, concluding the celebratory victory period. According to Balinese Hindu theology, deities and sanctified ancestral spirits who visited family homes during Galungan now ascend back to Swargaloka. Characteristic offerings include yellow turmeric rice (symbol of abundance and gratitude) as well as Tamiang shields mounted on shrines as spiritual defense against misfortune.'
      },
      'Saraswati': {
        nama: 'Saraswati Day',
        tanggal: 'Every 210 days on Saniscara Umanis Watugunung',
        keterangan: 'Celebration dedicated to Goddess Saraswati, patron of wisdom, arts, and sacred knowledge.',
        saran: 'Students and scholars bring books and manuscripts to temples for blessings; quiet and scholarly vibe.',
        sejarah: 'Saraswati Day honors the divine descent of sacred knowledge, letters, science, and the fine arts, personified by Goddess Saraswati seated upon a lotus with a sacred swan and peacock holding scriptures (lontar) and the veena lute. Balinese believe knowledge is humanity\'s supreme instrument to conquer ignorance and transcend rebirth cycles. On this day, reading books or writing on sacred scriptures is traditionally abstained as items are sanctified with fragrant offerings.'
      }
    }
  };

  function t(key) {
    const lang = localStorage.getItem('sari_lang') || 'id';
    if (lang === 'en' && TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return key;
  }

  function terapkanBahasaInggrisKeData() {
    try {
      const lang = localStorage.getItem('sari_lang') || 'id';
      if (lang !== 'en') return;

    // 1. Terjemahkan Destinasi
    if (Array.isArray(DESTINASI)) {
      DESTINASI.forEach((d) => {
        const tr = DATA_TRANSLATION_EN.destinasi[d.id];
        if (tr) {
          if (tr.nama) d.nama = tr.nama;
          if (tr.kategori) d.kategori = tr.kategori;
          if (tr.deskripsi) d.deskripsi = tr.deskripsi;
          if (tr.detail) d.detail = tr.detail;
          if (tr.highlight) d.highlight = tr.highlight;
          if (tr.aktivitas) d.aktivitas = tr.aktivitas;
          if (tr.waktuTerbaik) d.waktuTerbaik = tr.waktuTerbaik;
          if (tr.jamBuka) d.jamBuka = tr.jamBuka;
          if (tr.tarif) d.tarif = tr.tarif;
          if (tr.caraMasuk) d.caraMasuk = tr.caraMasuk;
          if (tr.etika) d.etika = tr.etika;
        }
      });
    }

    // 2. Terjemahkan Budaya
    if (Array.isArray(BUDAYA)) {
      BUDAYA.forEach((b) => {
        const tr = DATA_TRANSLATION_EN.budaya[b.id];
        if (tr) {
          if (tr.judul) b.judul = tr.judul;
          if (tr.ringkas) b.ringkas = tr.ringkas;
          if (tr.detail) b.detail = tr.detail;
        }
      });
    }

    // 3. Terjemahkan Kalender
    if (Array.isArray(KALENDER)) {
      KALENDER.forEach((k) => {
        const tr = DATA_TRANSLATION_EN.kalender[k.nama];
        if (tr) {
          if (tr.nama) k.nama = tr.nama;
          if (tr.tanggal) k.tanggal = tr.tanggal;
          if (tr.keterangan) k.keterangan = tr.keterangan;
          if (tr.saran) k.saran = tr.saran;
          if (tr.sejarah) k.sejarah = tr.sejarah;
        }
      });
    }

    // 4. Terjemahkan Wilayah
    if (Array.isArray(WILAYAH)) {
      WILAYAH.forEach((w) => {
        const tr = DATA_TRANSLATION_EN.wilayah[w.id];
        if (tr) w.nama = tr;
      });
    }
    } catch (e) {
      console.error('terapkanBahasaInggrisKeData error:', e);
    }
  }

  function walkTextNodes(node, callback) {
    try {
      if (node.nodeType === Node.TEXT_NODE) {
        callback(node);
      } else {
        if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE') return;
        for (const child of Array.from(node.childNodes)) {
          walkTextNodes(child, callback);
        }
      }
    } catch (e) {
      // skip problematic subtree
    }
  }

  function terjemahkanHalaman() {
    try {
      const lang = localStorage.getItem('sari_lang') || 'id';
      if (lang !== 'en') return;
      const dict = TRANSLATIONS.en;

    // 1. Recursive text-node translation untuk seluruh halaman
    walkTextNodes(document.body, (textNode) => {
      try {
        const val = textNode.nodeValue;
        const trimmed = val.trim();
        if (!trimmed) return;

        // Cek kamus persis
        if (dict[trimmed]) {
          textNode.nodeValue = val.replace(trimmed, dict[trimmed]);
          return;
        }

        // Cek kamus dengan pembersihan spasi ganda
        const clean = trimmed.replace(/\s+/g, ' ');
        if (dict[clean]) {
          textNode.nodeValue = val.replace(trimmed, dict[clean]);
        }
      } catch (e) {
        // skip problematic text node
      }
    });

    // 2. Ganti heading dan elemen komposit yang memiliki tag HTML di dalamnya
    const htmlReplacements = [
      ['Temukan <em>Bali Asli</em>,<br>Di Luar Zona Padat', 'Discover <em>Authentic Bali</em>,<br>Beyond Crowded Zones'],
      ['Wisata yang <em>Berarti</em> untuk Semua', 'Tourism that <em>Matters</em> to Everyone'],
      ['Tempat <em>Tenang</em> yang Layak Dikunjungi', '<em>Peaceful</em> Places Worth Exploring'],
      ['Wisata Lokal <em>Bali</em>', 'Local Tourism in <em>Bali</em>'],
      ['Hormati <em>Adat Bali</em> Sebelum Berangkat', 'Respect <em>Balinese Customs</em> Before Departing'],
      ['Hormati <em>Adat Bali</em>', 'Respect <em>Balinese Customs</em>'],
      ['Kalender <em>Hari Suci Bali</em>', 'Calendar of <em>Sacred Balinese Days</em>'],
      ['Siapa Kami, <em>Untuk Siapa</em>', 'Who We Are, <em>Who It Is For</em>'],
      ['SARI untuk <em>Bali</em>', 'SARI for <em>Bali</em>'],
      ['Inti seni, adat, dan rasa Bali untuk wisatawan bijak.', 'The essence of Balinese art, customs, and taste for mindful travelers.'],
      ['&copy; 2026 SARI — Wisata Lokal Bali. Dibuat sebagai proyek sosial tanpa komisi.', '&copy; 2026 SARI — Bali Local Tourism. Created as a non-commercial social project.'],
      ['&copy; 2026 SARI — Wisata Lokal Bali.', '&copy; 2026 SARI — Bali Local Tourism.']
    ];

    $$('h1, h2, h3, h4, p, span, div, footer').forEach((el) => {
      htmlReplacements.forEach(([idHtml, enHtml]) => {
        if (el.innerHTML && el.innerHTML.includes(idHtml)) {
          el.innerHTML = el.innerHTML.replace(idHtml, enHtml);
        }
      });
    });

    // 3. Terjemahkan atribut input dan tombol
    const searchInp = $('#live-search-input');
    if (searchInp) searchInp.placeholder = 'Search destinations, temples, beaches, waterfalls...';

    const clearBtn = $('#search-clear-btn');
    if (clearBtn) {
      clearBtn.title = 'Clear search';
      clearBtn.setAttribute('aria-label', 'Clear search');
    }

    $$('[placeholder]').forEach((el) => {
      const p = el.getAttribute('placeholder');
      if (p && dict[p.trim()]) el.setAttribute('placeholder', dict[p.trim()]);
    });

    $$('[title]').forEach((el) => {
      const t = el.getAttribute('title');
      if (t && dict[t.trim()]) el.setAttribute('title', dict[t.trim()]);
    });

    $$('[aria-label]').forEach((el) => {
      const a = el.getAttribute('aria-label');
      if (a && dict[a.trim()]) el.setAttribute('aria-label', dict[a.trim()]);
    });
    } catch (e) {
      console.error('terjemahkanHalaman error:', e);
    }
  }
  function renderEtika() {
    const grid = $('#grid-etika');
    if (!grid) return;
    grid.innerHTML = BUDAYA.map((b) => etikaCard(b)).join('');
  }

  // ---------- Kalender (v4 & v5 dengan sejarah) ----------
  function renderKalender() {
    const grid = $('#grid-kalender');
    if (!grid) return;
    grid.innerHTML = KALENDER.map((k) => `
      <div class="kal-card" data-tgl="${k.tanggal}">
        <span class="kal-tag">${t('Hari Suci')}</span>
        <h3>${k.nama}</h3>
        <p class="row"><strong>${ICON.calendar} ${t('Tanggal')}</strong><span>${k.tanggal}</span></p>
        <p class="row"><strong>${ICON.info} ${t('Makna')}</strong><span>${k.keterangan}</span></p>
        <p class="row"><strong>${ICON.check} ${t('Panduan Wisatawan')}</strong><span>${k.saran}</span></p>
        ${k.sejarah ? `
        <div class="sejarah">
          <strong style="display:flex; align-items:center; gap:0.35rem; font-size:0.88rem; color:var(--navy); margin-bottom:0.4rem;">${ICON.book} <span>${t('Sejarah & Asal-Usul Ritual:')}</span></strong>
          <p style="font-size:0.86rem; color:var(--ink); line-height:1.65; margin:0; text-align:justify;">${k.sejarah}</p>
        </div>
        ` : ''}
      </div>
    `).join('');
  }

  // ---------- Animasi Scroll Reveal ----------
  // Elemen diberi kelas .reveal lalu diamati; saat masuk viewport
  // diberi kelas .tampak sehingga transisi CSS berjalan.
  const PEMILIH_REVEAL = [
    '.head',
    '.detail-hero',
    '.detail-content',
    '.sidebar',
    '.card',
    '.value',
    '.etika-card',
    '.kal-card',
    '.acro',
    '.panel',
    '.cta-band',
    '.note'
  ];

  const GRUP_STAGGER = '.card, .value, .etika-card, .kal-card, .acro, .panel';

  let observerReveal = null;

  function terapkanReveal(akar) {
    const cakupan = akar || document;
    const targets = [];
    PEMILIH_REVEAL.forEach((sel) => {
      cakupan.querySelectorAll(sel).forEach((el) => {
        if (!el.classList.contains('reveal')) targets.push(el);
      });
    });
    if (!targets.length) return targets;

    targets.forEach((el) => {
      // Jeda bertingkat untuk kartu yang berderet dalam satu grid/panel
      const saudara = Array.from(el.parentElement.children).filter((c) =>
        c.matches(GRUP_STAGGER)
      );
      const idx = saudara.indexOf(el);
      if (idx > 0) {
        el.style.setProperty('--reveal-delay', `${Math.min(idx * 0.09, 0.45)}s`);
      }
      el.classList.add('reveal');
      if (observerReveal) observerReveal.observe(el);
    });

    return targets;
  }

  function initObserverReveal() {
    if (!('IntersectionObserver' in window)) return null;
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('tampak');
            observerReveal.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
  }

  function initAnimasiScroll() {
    observerReveal = initObserverReveal();

    const targets = terapkanReveal(document);

    // Beberapa elemen mungkin sudah diberi kelas .reveal sebelum observer dibuat
    // (mis. selama initFilter → saringDestinasi). Pastikan semua masih diamati.
    if (observerReveal) {
      PEMILIH_REVEAL.forEach((sel) => {
        document.querySelectorAll(sel + '.reveal').forEach((el) => {
          if (!el.classList.contains('tampak')) observerReveal.observe(el);
        });
      });

      // Fallback: elemen .reveal yang sudah ada di viewport saat dimuat,
      // langsung tampilkan tanpa menunggu event scroll / IntersectionObserver.
      const cekViewport = () => {
        document.querySelectorAll(PEMILIH_REVEAL.join(', ')).forEach((el) => {
          if (el.classList.contains('tampak')) return;
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('tampak');
        });
      };
      cekViewport();
      window.addEventListener('scroll', cekViewport, { passive: true });
    }

    // Tanpa IntersectionObserver (browser lama): tampilkan langsung
    if (!observerReveal) {
      targets.forEach((t) => t.classList.add('tampak'));
    }
  }

  // ---------- Navbar reaktif scroll ----------
  function initNavScroll() {
    const nav = $('.nav');
    if (!nav) return;
    const cek = () => nav.classList.toggle('tergulir', window.scrollY > 12);
    window.addEventListener('scroll', cek, { passive: true });
    cek();
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    terapkanBahasaInggrisKeData();
    initNav();
    renderBeranda();
    initFilter();
    initDetail();
    renderEtika();
    renderKalender();
    initAnimasiScroll();
    initNavScroll();
    terjemahkanHalaman();
  });

})();
