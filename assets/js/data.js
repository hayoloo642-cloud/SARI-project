// SARI - Data Aplikasi Wisata Lokal Bali + Etika Budaya
// =====================================================
// !!! FILE INI DIGENERATE OTOMATIS DARI DATABASE !!!
// Sumber: database/sari.db
// JANGAN edit manual. Perubahan lewat panel admin atau:
//   1. Edit database/sari.db
//   2. Jalankan: node database/generate.js
// =====================================================

const SARI_CONFIG = {
  "nama": "SARI",
  "tagline": "Inti seni, adat, dan rasa Bali untuk wisatawan bijak",
  "versi": "3.0.0-db"
};

const WILAYAH = [
  {
    "id": "karangasem",
    "nama": "Karangasem",
    "deskripsi": "Gunung, pura tua, dan pantai tenang di timur Bali."
  },
  {
    "id": "buleleng",
    "nama": "Buleleng",
    "deskripsi": "Pantai hitam, lumba-lumba, dan air terjun di utara Bali."
  },
  {
    "id": "tabanan",
    "nama": "Tabanan",
    "deskripsi": "Teras sawah UNESCO, sistem subak, dan pura di lereng gunung."
  },
  {
    "id": "klungkung",
    "nama": "Klungkung",
    "deskripsi": "Pusat kerajaan klasik, seni, dan gerbang menuju Nusa Penida."
  },
  {
    "id": "bangli",
    "nama": "Bangli",
    "deskripsi": "Danau Batur, udara sejuk pegunungan, dan adat yang masih hidup."
  },
  {
    "id": "gianyar",
    "nama": "Gianyar",
    "deskripsi": "Jantung seni dan kerajinan Bali dengan pasar-pasar tradisional."
  }
];

const DESTINASI = [
  {
    "id": "amed-pantai",
    "nama": "Pantai Amed",
    "wilayah": "karangasem",
    "kategori": "Pantai & Nelayan",
    "deskripsi": "Rangkaian desa nelayan berpasir hitam dengan terumbu karang yang paling sehat di Bali.",
    "detail": [
      "Amed bukan satu pantai tunggal, melainkan rangkaian desa nelayan di sepanjang pesisir timur laut Karangasem — dari Cemeluk, Lipah, hingga Bunutan. Pasir hitam vulkaniknya berasal dari endapan Gunung Agung, memberi warna laut yang pekat dan kontras dengan perahu jukung putih yang tersusun rapi di tepian.",
      "Di bawah permukaan, terumbu karang Amed termasuk yang paling sehat di Bali dan menjadi lokasi populer untuk snorkeling serta pelatihan selam. Pagi hari adalah waktu terbaik: laut tenang, cahaya lembut, dan para nelayan mulai turun ke perahu untuk melaut."
    ],
    "highlight": [
      "Snorkeling dan diving dengan visibilitas yang jernih",
      "Matahari terbit dari perahu jukung bersama nelayan lokal",
      "Bukit Amed di Cemeluk untuk panorama pantai dari ketinggian",
      "Warung ikan bakar jukut masih di tepi pantai"
    ],
    "aktivitas": [
      "Diving",
      "Fotografi",
      "Kuliner ikan bakar",
      "Matahari terbit",
      "Snorkeling"
    ],
    "waktuTerbaik": "April – November (musim kemarau)",
    "jamBuka": "06:00 – 18:00",
    "kontak": "0812-3456-7890",
    "tarif": "Gratis (donasi sukarela)",
    "caraMasuk": "Kendaraan pribadi dari Amlapura, sekitar 1 jam.",
    "etika": "Jangan menyentuh atau berdiri di atas terumbu karang. Hormati nelayan lokal yang sedang bekerja dan minta izin sebelum memotret perahu atau warga.",
    "budayaTerkait": [
      "adat-laut",
      "pantang-larang-desa"
    ],
    "whatsapp": "6281234567890",
    "gambar": "assets/images/amed.jpg",
    "galeri": [
      {
        "src": "assets/images/galeri/amed-1.jpg",
        "alt": "Perahu jukung tradisional di pesisir Pantai Amed"
      },
      {
        "src": "assets/images/galeri/amed-2.jpg",
        "alt": "Terumbu karang dan biota bawah laut Amed"
      },
      {
        "src": "assets/images/galeri/amed-3.jpg",
        "alt": "Matahari terbit tenang di atas teluk Amed"
      }
    ],
    "latitude": -8.3499,
    "longitude": 115.6568,
    "mapsUrl": "https://maps.google.com/?q=-8.3499,115.6568",
    "rating": 5,
    "ulasan": [
      {
        "id": 22,
        "nama": "Test Reviewer",
        "rating": 5,
        "komentar": "Test review comment - great place!",
        "tanggal": "2026-11-14"
      },
      {
        "id": 21,
        "nama": "Test Reviewer",
        "rating": 5,
        "komentar": "Test review comment - great place!",
        "tanggal": "2026-11-14"
      },
      {
        "id": 19,
        "nama": "Budi Santoso",
        "rating": 5,
        "komentar": "Snorkeling di Amed sangat tenang, banyak terumbu karang indah dan warga lokal sangat ramah.",
        "tanggal": "2026-11-14"
      },
      {
        "id": 4,
        "nama": "Sarah Jenkins",
        "rating": 5,
        "komentar": "Amazing snorkeling spot away from the crowded south. Local boatmen were incredibly friendly and respectful.",
        "tanggal": "2026-11-12"
      },
      {
        "id": 3,
        "nama": "I Wayan Sukadana",
        "rating": 5,
        "komentar": "Suasana pagi hari sangat hening, air laut jernih sekali sampai terumbu karang kelihatan dari perahu jukung nelayan lokal.",
        "tanggal": "2026-11-10"
      }
    ]
  },
  {
    "id": "tirta-gangga",
    "nama": "Taman Tirta Gangga",
    "wilayah": "karangasem",
    "kategori": "Taman Air Kerajaan",
    "deskripsi": "Taman air kerajaan 1948 dengan kolam koi, patung dewa, dan batu pijakan di atas air.",
    "detail": [
      "Dibangun tahun 1948 oleh raja terakhir Karangasem, Anak Agung Anglurah Ketut Karangasem, Tirta Gangga adalah taman air kerajaan yang memadukan gaya Bali, Tiongkok, dan Eropa. Namanya berarti \"air dari Gangga\", merujuk pada air suci sungai Gangga di India.",
      "Ikon utamanya adalah kolam dengan patung dewa dan ratu naga di atas air, serta deretan batu pijakan (stepping stones) yang memungkinkan Anda berjalan di atas kolam berisi ikan koi. Air yang mengisi kolam berasal dari mata air suci di daerah itu dan dipercaya memiliki kekuatan penyembuh."
    ],
    "highlight": [
      "Beri makan ikan koi dari batu pijakan di kolam utama",
      "Pemandian suci dengan sumber air pegunungan",
      "Taman patung dan arca bergaya khas Karangasem",
      "Trekking Bukit Asah di dekatnya untuk panorama timur Bali"
    ],
    "aktivitas": [
      "Beri makan koi",
      "Fotografi",
      "Pemandian suci",
      "Trekking ringan"
    ],
    "waktuTerbaik": "Pukul 07.00 – 09.00, sebelum rombongan tiba",
    "jamBuka": "07:00 – 18:00",
    "kontak": "0813-2233-4455",
    "tarif": "Rp 50.000 (dewasa)",
    "caraMasuk": "Kendaraan pribadi, area parkir tersedia.",
    "etika": "Gunakan kain saput saat memasuki area suci dan pemandian. Jangan merokok di sekitar kolam suci dan jangan berdiri di atas patung.",
    "budayaTerkait": [
      "busana-pura",
      "canang-sari"
    ],
    "whatsapp": "6281322334455",
    "gambar": "assets/images/tirta-gangga.jpg",
    "galeri": [
      {
        "src": "assets/images/galeri/tirta-gangga-1.jpg",
        "alt": "Batu pijakan di atas kolam suci Tirta Gangga"
      },
      {
        "src": "assets/images/galeri/tirta-gangga-2.jpg",
        "alt": "Ikan mas koi berenang di mata air alami"
      },
      {
        "src": "assets/images/galeri/tirta-gangga-3.jpg",
        "alt": "Taman air kerajaan dan arsitektur peninggalan Karangasem"
      }
    ],
    "latitude": -8.4116,
    "longitude": 115.5873,
    "mapsUrl": "https://maps.google.com/?q=-8.4116,115.5873",
    "rating": 4.5,
    "ulasan": [
      {
        "id": 6,
        "nama": "Michael Schmidt",
        "rating": 4,
        "komentar": "A truly peaceful royal garden. Visiting early morning before 9 AM gave us the whole place to ourselves.",
        "tanggal": "2026-11-11"
      },
      {
        "id": 5,
        "nama": "Ni Kadek Ayu",
        "rating": 5,
        "komentar": "Airnya segar dan sangat terawat. Jangan lupa bawa pakan ikan untuk memberi makan ikan koi besar di kolam utama.",
        "tanggal": "2026-11-08"
      }
    ]
  },
  {
    "id": "pura-lempuyang",
    "nama": "Pura Lempuyang",
    "wilayah": "karangasem",
    "kategori": "Pura",
    "deskripsi": "Pura Sad Kahyangan berusia ribuan tahun dengan candi bentar yang membingkai Gunung Agung.",
    "detail": [
      "Pura Lempuyang Luhur berdiri di puncak Bukit Lempuyang (±1.175 mdpl) dan merupakan salah satu Sad Kahyangan — enam pura utama arah mata angin di Bali — yang dipercaya sudah ada lebih dari 1.000 tahun.",
      "Candi Bentar di Pura Penataran Agung menjadi fenomena viral \"Gates of Heaven\" karena membingkai Gunung Agung dengan awan di kejauhan. Namun bagi umat Hindu, pura ini terutama tempat pemujaan Hyang Iswara; kunjungan wisata diharapkan menempati ruang tanpa mengganggu ritus yang sedang berlangsung."
    ],
    "highlight": [
      "Fenomena \"Gates of Heaven\" dengan latar Gunung Agung",
      "Jalur trek hutan ke tujuh pura di lereng (3–4 jam)",
      "Suasana berkabut yang misterius di pagi hari",
      "Pemandangan seluruh timur Bali dari puncak"
    ],
    "aktivitas": [
      "Fotografi",
      "Ibadah",
      "Meditasi",
      "Trekking"
    ],
    "waktuTerbaik": "Pukul 06.00 – 08.00, sebelum antrean foto memanjang",
    "jamBuka": "06:00 – 18:00",
    "kontak": "-",
    "tarif": "Donasi",
    "caraMasuk": "Kendaraan pribadi dari Denpasar, sekitar 2 jam.",
    "etika": "Wajib memakai kain saput dan syal. Jangan memotret pemuja yang sedang beribadah dan jangan duduk di atas dinding pura.",
    "budayaTerkait": [
      "busana-pura",
      "canang-sari"
    ],
    "whatsapp": null,
    "gambar": "assets/images/lempuyang.jpg",
    "galeri": [
      {
        "src": "assets/images/galeri/lempuyang-1.jpg",
        "alt": "Candi Bentar Gerbang Surga dengan latar Gunung Agung"
      },
      {
        "src": "assets/images/galeri/lempuyang-2.jpg",
        "alt": "Tangga naga suci menuju pelataran utama pura"
      },
      {
        "src": "assets/images/galeri/lempuyang-3.jpg",
        "alt": "Suasana hening di lereng Gunung Lempuyang"
      }
    ],
    "latitude": 0,
    "longitude": 0,
    "mapsUrl": "",
    "rating": 5,
    "ulasan": [
      {
        "id": 8,
        "nama": "Elena Rostova",
        "rating": 5,
        "komentar": "Breathtaking spiritual site. Make sure to wear respectful temple attire (sarong provided). The energy here is sublime.",
        "tanggal": "2026-11-13"
      },
      {
        "id": 7,
        "nama": "Ketut Dharma",
        "rating": 5,
        "komentar": "Tempat ibadah yang sangat disakralkan. Pemandangan Gunung Agung dari Gerbang Surga saat cuaca cerah betul-betul magis.",
        "tanggal": "2026-11-09"
      }
    ]
  },
  {
    "id": "lovina-pantai",
    "nama": "Pantai Lovina",
    "wilayah": "buleleng",
    "kategori": "Pantai & Nelayan",
    "deskripsi": "Laut tenang utara Bali tempat lumba-lumba liar muncul di pagi buta.",
    "detail": [
      "Lovina adalah kawasan pantai di pesisir utara Buleleng yang mencakup tujuh desa, dengan pusat di Kalibukbuk. Lautnya jauh lebih tenang dibanding pantai selatan sehingga aktivitas di air nyaman dilakukan sepanjang pagi.",
      "Atraksi utama Lovina adalah menonton lumba-lumba liar yang berkumpul di perairan ini pada pagi buta. Perahu tradisional berangkat sekitar pukul 05.30–06.00 dan menunggu lumba-lumba muncul di tengah laut. Setelah itu, snorkeling di perairan karang di sekitar Teluk Lovina juga populer."
    ],
    "highlight": [
      "Menyaksikan lumba-lumba liar dari perahu tradisional",
      "Snorkeling di perairan tenang dengan karang tropis",
      "Pemandian air panas Banjar Tega di dekatnya",
      "Pantai berpasir hitam yang hening, jauh dari keramaian"
    ],
    "aktivitas": [
      "Pemandian air panas",
      "Perahu nelayan",
      "Snorkeling",
      "Tontonan lumba-lumba"
    ],
    "waktuTerbaik": "Mei – Oktober (perairan paling tenang)",
    "jamBuka": "05:00 – 19:00",
    "kontak": "0814-5566-7788",
    "tarif": "Gratis",
    "caraMasuk": "Kendaraan pribadi dari Singaraja, sekitar 15 menit.",
    "etika": "Jangan memberi makan atau menyentuh lumba-lumba. Pilih operator perahu yang dikelola nelayan lokal dan ikuti arahan mereka saat di laut.",
    "budayaTerkait": [
      "adat-laut",
      "pantang-larang-desa"
    ],
    "whatsapp": "6281455667788",
    "gambar": "assets/images/lovina.jpg",
    "galeri": [
      {
        "src": "assets/images/galeri/lovina-1.jpg",
        "alt": "Kawanan lumba-lumba liar melompat di laut lepas Lovina"
      },
      {
        "src": "assets/images/galeri/lovina-2.jpg",
        "alt": "Perahu cadik nelayan menyambut fajar di Bali Utara"
      },
      {
        "src": "assets/images/galeri/lovina-3.jpg",
        "alt": "Ketenangan pesisir berpasir hitam di Pantai Lovina"
      }
    ],
    "latitude": -8.1609,
    "longitude": 115.0267,
    "mapsUrl": "https://maps.google.com/?q=-8.1609,115.0267",
    "rating": 4.5,
    "ulasan": [
      {
        "id": 10,
        "nama": "Liam O'Connor",
        "rating": 4,
        "komentar": "Gentle morning boat ride with dolphins breaching near sunrise. Calm waters and authentic local captains.",
        "tanggal": "2026-11-12"
      },
      {
        "id": 9,
        "nama": "Putu Artha",
        "rating": 5,
        "komentar": "Melihat lumba-lumba berenang bebas di habitat aslinya adalah pengalaman tak terlupakan untuk anak-anak.",
        "tanggal": "2026-11-07"
      }
    ]
  },
  {
    "id": "gitgit-airterjun",
    "nama": "Air Terjun Gitgit",
    "wilayah": "buleleng",
    "kategori": "Alam & Hutan",
    "deskripsi": "Air terjun 45 meter di hutan tropis dengan jalur melewati kebun cengkeh dan kopi warga.",
    "detail": [
      "Gitgit adalah air terjun paling terkenal di Bali utara, dengan ketinggian sekitar 45 meter. Aliran airnya jatuh ke kolam alami yang dikelilingi bebatuan dan pepohonan tropis yang rimbun.",
      "Akses menuju air terjun melalui jalur berbatu selama 10–15 menit dari parkir. Sepanjang jalur Anda melewati kebun cengkeh dan kopi milik warga, memberi gambaran nyata kehidupan agraris desa di dataran tinggi Buleleng."
    ],
    "highlight": [
      "Air terjun 45 meter yang masih alami",
      "Trekking ringan melalui kebun cengkeh dan kopi",
      "Kolam alami untuk berenang (waspada saat debit tinggi)",
      "Warung kecil dan parkir yang dikelola warga"
    ],
    "aktivitas": [
      "Berenang",
      "Fotografi",
      "Trekking",
      "Wisata kebun"
    ],
    "waktuTerbaik": "Pagi hari pukul 07.00 – 10.00",
    "jamBuka": "07:00 – 17:00",
    "kontak": "0815-6677-8899",
    "tarif": "Rp 20.000",
    "caraMasuk": "Dari Singaraja ke arah selatan, sekitar 10 km.",
    "etika": "Jangan membuang sampah di sekitar air terjun dan gunakan tempat sampah yang disediakan. Jangan memanjat pagar pengaman yang ada.",
    "budayaTerkait": [
      "pantang-larang-desa"
    ],
    "whatsapp": "6281566778899",
    "gambar": "assets/images/gitgit.jpg",
    "galeri": [
      {
        "src": "assets/images/galeri/gitgit-1.jpg",
        "alt": "Derasnya tirai air terjun Gitgit di tengah ngarai hijau"
      },
      {
        "src": "assets/images/galeri/gitgit-2.jpg",
        "alt": "Hutan hujan tropis rimbun di jalur setapak Gitgit"
      },
      {
        "src": "assets/images/galeri/gitgit-3.jpg",
        "alt": "Kolam alami jernih di bawah air terjun"
      }
    ],
    "latitude": 0,
    "longitude": 0,
    "mapsUrl": "",
    "rating": 5,
    "ulasan": [
      {
        "id": 12,
        "nama": "Claire Dubois",
        "rating": 5,
        "komentar": "Lush tropical trail filled with clove and coffee trees. The waterfall mist is so refreshing after the hike.",
        "tanggal": "2026-11-10"
      },
      {
        "id": 11,
        "nama": "Gede Wira",
        "rating": 5,
        "komentar": "Air terjun tertinggi dan udara di sekitarnya sangat sejuk. Jalur tangga menurun cukup menguras tenaga tapi terbayar lunas.",
        "tanggal": "2026-11-06"
      }
    ]
  },
  {
    "id": "jatiluwih-sawah",
    "nama": "Teras Sawah Jatiluwih",
    "wilayah": "tabanan",
    "kategori": "Sawah & Subak",
    "deskripsi": "600 hektar sawah subak Warisan Dunia UNESCO di kaki Gunung Batukaru.",
    "detail": [
      "Jatiluwih berarti \"luar biasa indah\" — dan terasering sawahnya memang setara dengan namanya. Terbentang lebih dari 600 hektar di kaki Gunung Batukaru, sawah di Jatiluwih mengikuti sistem subak, sistem irigasi tradisional Bali yang telah berusia lebih dari 1.000 tahun dan diakui UNESCO sebagai Warisan Budaya Dunia pada 2012.",
      "Saat berjalan di jalur setapak sawah, Anda akan bertemu petani yang bekerja dengan cara tradisional serta angsa-angsa yang berkeliaran. Warna pemandangan berubah menurut musim: hijau muda saat masa tanam dan kuning keemasan menjelang panen."
    ],
    "highlight": [
      "Panorama terasering sawah subak seluas 600 hektar",
      "Jalur setapak di tengah sawah untuk jalan santai",
      "Warung kuliner lokal dengan pemandangan terbuka",
      "Wisata edukasi sistem irigasi subak"
    ],
    "aktivitas": [
      "Bersepeda",
      "Edukasi subak",
      "Fotografi",
      "Kuliner",
      "Trekking sawah"
    ],
    "waktuTerbaik": "Juni – Agustus (padi hijau merata)",
    "jamBuka": "06:00 – 18:00",
    "kontak": "0816-7788-9900",
    "tarif": "Rp 40.000",
    "caraMasuk": "Kendaraan pribadi dari Denpasar, sekitar 1,5 jam.",
    "etika": "Jangan menginjak area tanaman padi dan jalur sawah yang sedang dibajak. Hormati petani yang sedang bekerja, minta izin sebelum memotret dekat.",
    "budayaTerkait": [
      "pantang-larang-desa"
    ],
    "whatsapp": "6281677889900",
    "gambar": "assets/images/jatiluwih.jpg",
    "galeri": [
      {
        "src": "assets/images/galeri/jatiluwih-1.jpg",
        "alt": "Lansekap hijau bertingkat warisan dunia UNESCO Jatiluwih"
      },
      {
        "src": "assets/images/galeri/jatiluwih-2.jpg",
        "alt": "Saluran irigasi tradisional Subak yang terjaga ratusan tahun"
      },
      {
        "src": "assets/images/galeri/jatiluwih-3.jpg",
        "alt": "Kabut pagi di perbukitan sawah terasering"
      }
    ],
    "latitude": -8.3698,
    "longitude": 115.1311,
    "mapsUrl": "https://maps.google.com/?q=-8.3698,115.1311",
    "rating": 5,
    "ulasan": [
      {
        "id": 14,
        "nama": "David Miller",
        "rating": 5,
        "komentar": "The vast green rice terraces seem to go on forever. Unforgettable UNESCO heritage without tourist circus.",
        "tanggal": "2026-11-11"
      },
      {
        "id": 13,
        "nama": "Made Sudarma",
        "rating": 5,
        "komentar": "Sistem irigasi Subak di sini adalah mahakarya leluhur. Jalan kaki di jalur trekking sawah sangat menenangkan pikiran.",
        "tanggal": "2026-11-05"
      }
    ]
  },
  {
    "id": "pura-batukaru",
    "nama": "Pura Luhur Batukaru",
    "wilayah": "tabanan",
    "kategori": "Pura",
    "deskripsi": "Pura Sad Kahyangan yang tersembunyi di hutan berkabut lereng Gunung Batukaru.",
    "detail": [
      "Pura Luhur Batukaru adalah salah satu Sad Kahyangan yang dipercaya menjaga arah barat Bali. Berbeda dengan pura-pura besar yang terbuka, pura ini tersembunyi di dalam hutan lebat di lereng Gunung Batukaru dengan arsitektur khas lereng gunung.",
      "Kabut yang turun hampir setiap siang memberikan suasana mistis. Area pura dijaga hening oleh burung-burung hutan, memberi pengalaman ibadah dan refleksi yang sulit ditemukan di pura lain di Bali."
    ],
    "highlight": [
      "Suasana mistis di tengah hutan berkabut",
      "Pura Sad Kahyangan dengan arsitektur lereng gunung",
      "Trekking Gunung Batukaru untuk pendaki berpengalaman",
      "Dekat kebun teh dan cengkeh milik warga"
    ],
    "aktivitas": [
      "Fotografi",
      "Ibadah",
      "Kuliner desa",
      "Trekking gunung"
    ],
    "waktuTerbaik": "Pagi hari (kabut tipis, suasana hening)",
    "jamBuka": "07:00 – 17:00",
    "kontak": "-",
    "tarif": "Donasi",
    "caraMasuk": "Kendaraan pribadi, area parkir tersedia di bawah.",
    "etika": "Wajib kain saput dan syal. Jangan berbicara keras di area suci dan jangan memasuki area dalam pura tanpa didampingi.",
    "budayaTerkait": [
      "busana-pura",
      "canang-sari"
    ],
    "whatsapp": null,
    "gambar": "assets/images/batukaru.jpg",
    "galeri": [
      {
        "src": "assets/images/galeri/batukaru-1.jpg",
        "alt": "Meru bertingkat sakral dinaungi rimbun hutan lereng gunung"
      },
      {
        "src": "assets/images/galeri/batukaru-2.jpg",
        "alt": "Pelinggih batu berselimut lumut kuno yang damai"
      },
      {
        "src": "assets/images/galeri/batukaru-3.jpg",
        "alt": "Kanopi hutan lindung suci Gunung Batukaru"
      }
    ],
    "latitude": 0,
    "longitude": 0,
    "mapsUrl": "",
    "rating": 5,
    "ulasan": [
      {
        "id": 16,
        "nama": "Sophie Martin",
        "rating": 5,
        "komentar": "Deeply spiritual and untouched temple surrounded by primordial rainforest. Far more meaningful than crowded tourist spots.",
        "tanggal": "2026-11-09"
      },
      {
        "id": 15,
        "nama": "Wayan Sujana",
        "rating": 5,
        "komentar": "Pura di tengah hutan belantara kaki gunung. Hawanya sejuk berkabut, sangat hening untuk menenangkan batin dan berdoa.",
        "tanggal": "2026-11-04"
      }
    ]
  },
  {
    "id": "sidemen-sawah",
    "nama": "Desa Sidemen",
    "wilayah": "karangasem",
    "kategori": "Desa & Pertanian",
    "deskripsi": "Lembah tenang di kaki Gunung Agung, dijuluki \"Ubud dua puluh tahun silam\".",
    "detail": [
      "Sidemen adalah lembah pedesaan di kaki Gunung Agung yang sering dijuluki \"Ubud dua puluh tahun silam\" — jauh lebih tenang namun sama indahnya. Warga menggeluti pertanian sawah, tenun songket endek, dan pembuatan arak tradisional.",
      "Berjalan menyusuri jalan desa, Anda akan melihat kegiatan sehari-hari warga: petani membajak sawah, ibu-ibu menenun di beranda, dan anak-anak bermain di sungai. Ini destinasi untuk merelaksasi diri tanpa keramaian."
    ],
    "highlight": [
      "Panorama sawah dengan latar Gunung Agung",
      "Wisata tenun endek dan songket kerja tangan warga",
      "Trekking ringan lembah dan desa",
      "Kuliner khas Karangasem"
    ],
    "aktivitas": [
      "Bersepeda",
      "Fotografi",
      "Kuliner",
      "Tenun & kerajinan",
      "Trekking"
    ],
    "waktuTerbaik": "Maret – November",
    "jamBuka": "06:00 – 18:00",
    "kontak": "0817-8899-0011",
    "tarif": "Gratis",
    "caraMasuk": "Dari Amlapura ke arah barat, sekitar 30 menit.",
    "etika": "Tidak semua area boleh difoto. Tanyakan izin kepada pemilik rumah atau petani terlebih dahulu, terutama saat ritual sedang berlangsung.",
    "budayaTerkait": [
      "pantang-larang-desa"
    ],
    "whatsapp": "6281788990011",
    "gambar": "assets/images/sidemen.jpg",
    "galeri": [
      {
        "src": "assets/images/galeri/sidemen-1.jpg",
        "alt": "Pemandangan lembah asri Sidemen menghadap Gunung Agung"
      },
      {
        "src": "assets/images/galeri/sidemen-2.jpg",
        "alt": "Pematang sawah alami dan sungai jernih di perbukitan"
      },
      {
        "src": "assets/images/galeri/sidemen-3.jpg",
        "alt": "Tradisi tenun kain songket dan endek khas warga desa"
      }
    ],
    "latitude": 0,
    "longitude": 0,
    "mapsUrl": "",
    "rating": 5,
    "ulasan": [
      {
        "id": 18,
        "nama": "Tom van Dijk",
        "rating": 5,
        "komentar": "Sidemen reminds me of Bali decades ago. Peaceful valley walks, friendly villagers, and stunning vistas of Mount Agung.",
        "tanggal": "2026-11-13"
      },
      {
        "id": 17,
        "nama": "Nyoman Kartika",
        "rating": 5,
        "komentar": "Desa yang masih sangat asri dengan panorama lembah dan kain tenun tradisional. Penginapan lokalnya ramah dan otentik.",
        "tanggal": "2026-11-03"
      }
    ]
  }
];

const BUDAYA = [
  {
    "id": "busana-pura",
    "judul": "Busana Masuk Pura",
    "ringkas": "Kain saput dan syal untuk wanita, kain panjang untuk pria.",
    "detail": "Kain saput dipakai di pinggang dan syal menutup bahu. Hindari celana pendek dan rok mini di area suci. Jika tidak membawa, biasanya dapat dipinjam di pintu masuk pura."
  },
  {
    "id": "canang-sari",
    "judul": "Canang Sari",
    "ringkas": "Persembahan kecil dari janur dan bunga di jalanan dan depan rumah.",
    "detail": "Jangan menginjak canang yang tersebar di jalanan. Jika ingin memotret, minta izin terlebih dahulu kepada pemilik rumah atau penjaga area."
  },
  {
    "id": "nyepi",
    "judul": "Hari Nyepi",
    "ringkas": "Hari suci Tahun Baru Saka, seluruh aktivitas dihentikan 24 jam.",
    "detail": "Selama Catur Brata Penyepian: api mati, lampu redup, tidak keluar rumah, tidak bekerja, dan tidak bersuka ria. Wisatawan di hotel juga diharapkan mematuhi."
  },
  {
    "id": "basa-bali",
    "judul": "Frasa Bahasa Bali Dasar",
    "ringkas": "Kata sederhana untuk menunjukkan hormat kepada warga lokal.",
    "detail": "Om Swastiastu (salam hormat), Matur Suksma (terima kasih), Bli (sapaan laki-laki), Mbok (sapaan perempuan)."
  },
  {
    "id": "adat-laut",
    "judul": "Adat Laut & Nelayan",
    "ringkas": "Hormati laut dan kehidupan nelayan di pesisir Bali.",
    "detail": "Jangan membuang sampah ke laut dan jangan menyentuh terumbu karang saat berenang. Jika akan naik perahu, ikuti arahan nelayan lokal."
  },
  {
    "id": "pantang-larang-desa",
    "judul": "Pantang Larang Desa",
    "ringkas": "Beberapa area desa memiliki larangan khusus pada waktu tertentu.",
    "detail": "Perhatikan papan pengumuman di pintu desa. Jika ada area yang dilarang untuk difoto, hargai dan jangan memaksa mengambil gambar."
  }
];

const KALENDER = [
  {
    "id": 1,
    "nama": "Nyepi",
    "tanggal": "Menurut kalender Saka (biasanya Maret–April)",
    "keterangan": "Hari sunyi, seluruh aktivitas di Bali berhenti 24 jam.",
    "saran": "Tetap di akomodasi, lampu redup, jangan beraktivitas di luar.",
    "sejarah": "Hari Raya Nyepi menandai pergantian Tahun Baru Saka Hindu yang dimulai sejak tahun 78 Masehi, merujuk pada rekonsiliasi damai antar-suku bangsa di India kuno oleh Raja Kaniska I. Di Bali, Nyepi bertransformasi menjadi momen pemurnian kosmos (Bhuana Agung) dan batin manusia (Bhuana Alit) melalui Catur Brata Penyepian: Amati Geni (tidak menyalakan api/cahaya), Amati Karya (tidak bekerja), Amati Lelungan (tidak bepergian), dan Amati Lelanguan (tidak bersenang-senang). Sehari sebelum Nyepi, diadakan upacara Tawur Kesanga dan pawai Ogoh-ogoh sebagai simbol menetralisir sifat-sifat negatif (Bhuta Kala) agar keharmonisan semesta kembali suci."
  },
  {
    "id": 2,
    "nama": "Galungan",
    "tanggal": "Setiap 210 hari (kalender Pawukon)",
    "keterangan": "Perayaan kemenangan dharma, penjor dipasang di depan rumah.",
    "saran": "Pura ramai, warga memakai busana adat. Foto boleh dengan penuh hormat.",
    "sejarah": "Hari Raya Galungan diperingati untuk merayakan kemenangan kebajikan (Dharma) melawan kejahatan (Adharma). Tradisi ini pertama kali dirayakan secara resmi pada Purnama Kapat tahun 882 Masehi semasa pemerintahan Raja Sri Jayakasunu. Konon raja menerima wangsit suci dari Dewi Durga untuk mengadakan perayaan puja bhakti kepada Hyang Widhi dan para leluhur agar wabah malapetaka reda. Penjor megah yang terbuat dari bambu berhiaskan janur, padi, dan hasil bumi dipasang di depan setiap rumah sebagai lambang Gunung Agung dan naga kemakmuran Basuki-Ananta Boga."
  },
  {
    "id": 3,
    "nama": "Kuningan",
    "tanggal": "10 hari setelah Galungan",
    "keterangan": "Hari para leluhur kembali ke surga.",
    "saran": "Suasana mirip Galungan namun lebih tenang. Waktu terbaik melihat ritual keluarga.",
    "sejarah": "Hari Raya Kuningan jatuh tepat 10 hari setelah Galungan, menandai penutupan rangkaian perayaan kemenangan Dharma. Menurut teologi Hindu Bali, pada hari ini para Dewa dan roh suci leluhur yang sebelumnya turun mengunjungi sanak keluarga saat Galungan akan kembali berpulang ke Swargaloka. Ciri khas upacara Kuningan adalah persembahan nasi kuning (simbol kemakmuran dan rasa syukur) serta Tamiang dan Kolem yang dipasang di pelinggih sebagai tameng pertahanan spiritual diri dari marabahaya."
  },
  {
    "id": 4,
    "nama": "Saraswati",
    "tanggal": "Setiap 210 hari",
    "keterangan": "Hari ilmu pengetahuan, buku dan lontar disembahyakan.",
    "saran": "Sekolah dan perpustakaan mungkin libur. Hormati ritual yang berlangsung.",
    "sejarah": "Hari Raya Saraswati dirayakan setiap hari Saniscara Umanis Wuku Watugunung untuk memuja Sang Hyang Saraswati, dewi penguasa ilmu pengetahuan, sastra, dan kebijaksanaan suci. Filosofi Saraswati mengajarkan bahwa pengetahuan adalah senjata sejati manusia untuk mengatasi kebodohan (Awidya) dan mencapai pencerahan hidup. Pada hari ini, kitab suci Weda, lontar kuno, dan buku-buku disucikan dengan canang sari dan wewangian, sementara umat berpantang membaca dan menulis sampai matahari terbit keesokan harinya saat Banyu Pinaruh (mandi suci penyucian diri di mata air)."
  }
];
