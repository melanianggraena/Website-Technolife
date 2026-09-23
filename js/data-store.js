/**
 * Technolife Group - Unified Data Store (TechnoDataStore)
 * Acts as the Single Source of Truth shared between the Public Website and Admin Dashboard.
 * Persists dynamically to localStorage with automatic fallback to high-quality default seed data.
 */

const TECHNO_STORAGE_KEY = 'technolife_master_store_v1';

// Default Seed Data
const DEFAULT_STORE_DATA = {
    settings: {
        companyName: "Technolife Group",
        tagline: "One Stop Entertainment & Business - Fasilitas Manajemen Terintegrasi di Jatinangor.",
        phone: "+62 811 2298 880",
        whatsapp: "+62 811 2298 880",
        email: "info@technolife.co.id",
        address: "Jl. Raya Ir. Soekarno No. 4-6, Cibeusi, Kec. Jatinangor, Kabupaten Sumedang, Jawa Barat 45363",
        workingHours: "Setiap Hari: 08:00 - 22:00 WIB",
        facebookUrl: "https://facebook.com/technolife.id",
        instagramUrl: "https://instagram.com/technolife_id",
        linkedinUrl: "https://linkedin.com/company/technolife-id"
    },
    facilities: [
        {
                "id": "needs",
                "name": "Needs & Office Essentials",
                "category": "facility",
                "badge": "Workspace Essentials",
                "shortDesc": "Penyediaan sarana ruang kerja esensial, perlengkapan kantor modern, dan manajemen utilitas terpadu.",
                "description": "Needs menyediakan solusi infrastruktur perkantoran terpadu bagi perusahaan, startup, dan organisasi. Mulai dari pengadaan furnitur ergonomis, tata ruang modular, hingga manajemen utilitas dan perlengkapan operasional harian yang dirancang untuk mendukung efisiensi kerja maksimal.",
                "specs": "Private & Dedicated",
                "price": "Mulai Rp 1.500.000 / bln",
                "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Furnitur & Meja Kerja Ergonomis",
                        "Sistem Kelistrikan & Stopkontak Terintegrasi",
                        "Pengelolaan Utilitas & Kebersihan Harian",
                        "Akses Internet Serat Optik Kecepatan Tinggi",
                        "Penyimpanan Dokumen & Lemari Berkunci",
                        "Dukungan Manajemen Fasilitas 24/7"
                ],
                "location": "Lantai 1 - 2, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "studyspace",
                "name": "Study Space",
                "category": "facility",
                "badge": "Focus Environment",
                "shortDesc": "Ruang belajar dan riset akustik tenang dengan kursi ergonomis, meja privat, stopkontak mandiri, dan internet serat optik gigabit.",
                "description": "Study Space dirancang khusus sebagai zona belajar, membaca, dan riset berorientasi konsentrasi tinggi bagi mahasiswa, akademisi, dan profesional. Dengan peredam akustik, pencahayaan ramah mata, dan koneksi internet stabil, suasana belajar menjadi sangat kondusif.",
                "specs": "Acoustic Quiet Zone",
                "price": "Mulai Rp 25.000 / sesi",
                "image": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Acoustic Quiet Zone (Zona Hening Bebas Bising)",
                        "Private Study Pod & Meja Belajar Personal",
                        "Individual Power Socket & Port USB Fast Charging",
                        "High-Speed Gigabit WiFi",
                        "Lampu Meja LED dengan Pengatur Kecerahan",
                        "Free Refill Mineral Water & Akses Pantry"
                ],
                "location": "Lantai 2, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "technobillyard",
                "name": "Techno Billiard",
                "category": "facility",
                "badge": "Recreation & Lounge",
                "shortDesc": "Area rekreasi biliar berstandar turnamen dan lounge eksekutif modern untuk relaksasi dan networking selepas aktivitas.",
                "description": "Techno Billiard menghadirkan pengalaman rekreasi olahraga biliar modern dengan meja berstandar turnamen internasional, stik profesional, dan pencahayaan presisi. Dilengkapi executive lounge dan layanan F&B langsung ke meja permainan.",
                "specs": "Standard Tournament Tables",
                "price": "Rp 50.000 / jam",
                "image": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Meja Biliar Standar Turnamen Internasional (9 Feet)",
                        "Bola & Stik Biliar Kualitas Profesional",
                        "Pencahayaan LED Overhead Tanpa Bayangan",
                        "Executive Lounge Seating & Musik Santai",
                        "Pemesanan Makanan & Minuman Langsung ke Meja",
                        "Area Bebas Asap Rokok (Full AC)"
                ],
                "location": "Lantai 3, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "ballroom",
                "name": "Bhimasena Ballroom",
                "category": "facility",
                "badge": "Grand Event Venue",
                "shortDesc": "Grand ballroom megah dan berkelas untuk resepsi pernikahan, wisuda kampus, konferensi nasional, dan gathering akbar korporat.",
                "description": "Bhimasena Ballroom merupakan venue serbaguna termegah di kawasan Jatinangor dengan kapasitas hingga 1.500 orang. Dilengkapi panggung megah, videotron LED raksasa, tata suara konser premium, ruang rias VIP, serta akses loading dock langsung.",
                "specs": "Kapasitas hingga 1.500 Tamu",
                "price": "Hubungi Penjualan (Paket Fleksibel)",
                "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Kapasitas Luas hingga 1.500 Tamu (Standing/Theatre/Round Table)",
                        "Videotron LED Screen P2.5 Ultra High Definition",
                        "Sistem Tata Suara Line Array & Tata Cahaya Panggung Megah",
                        "Ruang Tunggu VIP & 2 Ruang Ganti/Rias Eksklusif",
                        "Akses Masuk Khusus & Loading Dock Luas",
                        "Dukungan Katering Internal & Tim Banquet Berpengalaman"
                ],
                "location": "Main Hall Lantai 1, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "trainingcenter",
                "name": "Training Center",
                "category": "facility",
                "badge": "Interactive Workshop",
                "shortDesc": "Pusat pelatihan dan edukasi modern dengan smart screen interaktif 4K, sound system pro, dan layout kursi modular.",
                "description": "Training Center Technolife adalah ruang pembelajaran korporat dan akademik berteknologi tinggi. Cocok untuk seminar, sertifikasi, workshop keterampilan, dan program pelatihan intensif dengan layout meja kursi yang dapat disesuaikan.",
                "specs": "30 - 100 Peserta",
                "price": "Mulai Rp 1.500.000 / sesi",
                "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Smart Board Interaktif 4K & Dual Proyektor Laser",
                        "Sistem Tata Suara Nirkabel (Wireless Mic & Podium)",
                        "Konfigurasi Meja Kursi Modular (Classroom, U-Shape, Workshop)",
                        "Akses Internet Berkecepatan Tinggi untuk Peserta",
                        "Paket Coffee Break & Makan Siang Terpadu",
                        "Papan Tulis Kaca Luas & Alat Presentasi Lengkap"
                ],
                "location": "Lantai 2, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "technofit",
                "name": "Techno Fit",
                "category": "facility",
                "badge": "Health & Fitness",
                "shortDesc": "Pusat kebugaran dan gym modern dengan peralatan cardio, strength training lengkap, dan instruktur profesional.",
                "description": "Techno Fit menghadirkan fasilitas gym dan kebugaran komprehensif untuk mendukung gaya hidup sehat para profesional, mahasiswa, dan masyarakat. Menyediakan peralatan beban terkini, treadmill pintar, serta instruktur bersertifikat.",
                "specs": "Gym & Wellness Center",
                "price": "Mulai Rp 200.000 / bln",
                "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Alat Treadmill & Cardio Canggih dengan Layar Digital",
                        "Free Weights & Mesin Strength Training Lengkap",
                        "Instruktur Gym Bersertifikat & Program Latihan Khusus",
                        "Locker Room, Kamar Bilas Bersih & Air Hangat",
                        "Area Peregangan & Matras Yoga",
                        "Akses Harian atau Membership Bulanan Fleksibel"
                ],
                "location": "Lantai 3, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "decoin",
                "name": "Deco.in Creative Studio",
                "category": "facility",
                "badge": "Creative & Production",
                "shortDesc": "Studio foto, video production, live podcast recording, dan konsultasi penataan ruang visual kreatif.",
                "description": "Deco.in adalah sentra produksi konten multimedia dan studio kreatif. Dilengkapi tata lampu studio profesional, mikrofon podcast broadcast-grade, kamera 4K, serta backdrop fleksibel (Green screen, Minimalist, Cyclorama) untuk berbagai kebutuhan komersial.",
                "specs": "Studio Recording & Lighting",
                "price": "Mulai Rp 250.000 / jam",
                "image": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Set Podcast Broadcast (Multi Mic Shure/Rode & Audio Mixer)",
                        "Lighting Softbox, RGB Panel, & Ring Light Studio",
                        "Kamera 4K Video Recording & Live Streaming Ready",
                        "Green Screen & Backdrop Warna Modular",
                        "Acoustic Soundproofing Ruangan Kedap Suara",
                        "Operator Studio & Bantuan Teknis"
                ],
                "location": "Lantai 2, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "meetingroom",
                "name": "Smart Meeting Room",
                "category": "facility",
                "badge": "Executive Conference",
                "shortDesc": "Ruang rapat kedap suara dilengkapi AI video conference camera, smart monitor, dan sajian coffee break.",
                "description": "Smart Meeting Room menyediakan privasi dan kelengkapan teknologi untuk rapat direksi, presentasi bisnis, negosiasi kemitraan, dan sesi hybrid conference. Dirancang dengan interior mewah beraksen kayu dan kenyamanan kursi eksekutif.",
                "specs": "Kapasitas 6 - 25 Orang",
                "price": "Mulai Rp 150.000 / jam",
                "image": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Kamera Konferensi Cerdas AI dengan Auto-Framing",
                        "Smart Screen UHD 65-75 Inch & Kabel Presentasi Universal",
                        "Speakerphone Omni-Directional Jernih",
                        "Dinding Kedap Suara untuk Kerahasiaan Diskusi",
                        "Layanan Coffee, Tea & Snack Penyegar Rapat",
                        "Papan Tulis Kaca Magnetic & Alat Tulis"
                ],
                "location": "Lantai 2, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "coworking",
                "name": "Travail Coworking Space",
                "category": "facility",
                "badge": "Agile Workspace",
                "shortDesc": "Ruang kerja fleksibel dengan hot desk, dedicated desk, private office 4-10 orang, free-flow beverage, dan high-speed internet.",
                "description": "Travail Coworking Space adalah ruang kerja bersama yang dinamis, didesain untuk mendorong kolaborasi, kreativitas, dan produktivitas freelancer, startup founder, dan tim digital. Dilengkapi area hot desk luas, private office, dan lounge santai.",
                "specs": "Flexible & Private Office",
                "price": "Mulai Rp 50.000 / hari",
                "image": "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Pilihan Hot Desk Harian & Dedicated Desk Bulanan",
                        "Private Office Room untuk Tim 4 - 10 Orang",
                        "Free-Flow Kopi, Teh, dan Air Mineral",
                        "Akses Internet Dedicated 100 Mbps Up/Down",
                        "Akses Ruang Rapat & Kuota Cetak Dokumen",
                        "Komunitas Bisnis & Networking Event Rutin"
                ],
                "location": "Lantai 2, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "virtualoffice",
                "name": "Virtual Office",
                "category": "facility",
                "badge": "Legal Business Address",
                "shortDesc": "Alamat domisili bisnis strategis di Jatinangor dengan layanan penerimaan dokumen/surat dan kuota pemakaian meeting room.",
                "description": "Virtual Office Technolife memberikan legalitas alamat bisnis prestisius bagi PT, CV, atau startup tanpa biaya sewa fisik yang mahal. Termasuk penanganan surat menyurat, layanan resepsionis profesional, dan kuota gratis penggunaan meeting room bulanan.",
                "specs": "Legal Business Address",
                "price": "Mulai Rp 350.000 / bln",
                "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Alamat Domisili Usaha Legal & Resmi di Jatinangor",
                        "Layanan Penerimaan Surat, Paket, dan Notifikasi WA",
                        "Layanan Resepsionis Profesional Penyambut Tamu",
                        "Gratis Kuota Pemakaian Smart Meeting Room Bulanan",
                        "Dukungan Pengurusan Legalitas Usaha & PKP",
                        "Diskon Khusus Penggunaan Fasilitas Ballroom & F&B"
                ],
                "location": "Technolife Building Jatinangor",
                "active": true
        }
],
    fnb: [
        {
                "id": "cateringbrownsugar",
                "name": "Dapur Satelit & Catering Brown Sugar",
                "category": "fnb",
                "badge": "Corporate & Event Catering",
                "shortDesc": "Layanan katering higienis untuk resepsi pernikahan, rapat instansi, program makan bergizi terpadu, dan prasmanan.",
                "description": "Dapur Satelit & Catering Brown Sugar melayani katering skala besar bersertifikasi higienis dan halal. Mampu memproduksi ribuan porsi harian untuk acara pernikahan megah di ballroom, konsumsi instansi kampus/pemerintah, hingga program penyediaan makan bergizi.",
                "hours": "Pemesanan H-1 | Pengiriman 06:00 - 20:00 WIB",
                "priceRange": "Mulai Rp 25.000 / porsi",
                "image": "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Katering Prasmanan Mewah Pernikahan & Gala Dinner",
                        "Box Nasi Bento Eksklusif untuk Rapat & Workshop",
                        "Menu Sehat Terstandarisasi dengan Ahli Gizi",
                        "Kapasitas Produksi Masif Ribuan Porsi Harian",
                        "Peralatan Banquet & Tim Waiter Profesional",
                        "Sertifikasi Higienitas & Jaminan 100% Halal"
                ],
                "location": "Central Kitchen, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "kallsmaison",
                "name": "Kals Maison (Bakery & Cafe)",
                "category": "fnb",
                "badge": "Artisanal Bakery",
                "shortDesc": "Pastry khas Prancis autentik, croissant hangat berlapis mentega, sourdough, cake premium, dan specialty coffee.",
                "description": "Kals Maison adalah bakery kafe autentik Prancis yang menyajikan aneka roti dan pastry segar yang dipanggang setiap pagi. Nikmati butter croissant renyah, sourdough alami, kue tart lezat, dan racikan kopi berkualitas di suasana kafe yang hangat dan estetik.",
                "hours": "08:00 - 21:00 WIB",
                "priceRange": "Rp 20.000 - Rp 65.000",
                "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Freshly Baked Artisanal Croissants & Danish Pastry",
                        "Sourdough Loaf & Roti Gandum Alami Tanpa Pengawet",
                        "Dessert Tart, Eclairs, & Signature Birthday Cakes",
                        "Specialty Espresso Drinks & Signature Artisan Teas",
                        "Area Duduk Indoor Nyaman Berkonsep Parisian Chic",
                        "Layanan Pemesanan Parsel & Custom Cake Box"
                ],
                "location": "Lantai 1, Front Terrace Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "skywatchresto",
                "name": "Skywatch Resto",
                "category": "fnb",
                "badge": "Panoramic Rooftop Dining",
                "shortDesc": "Restoran rooftop berpanorama pegunungan Jatinangor, menyajikan ragam hidangan khas Nusantara pilihan dan Western favorit.",
                "description": "Skywatch Resto menyajikan pengalaman bersantap istimewa di lantai atas dengan panorama spektakuler Gunung Manglayang dan lanskap kota Jatinangor. Menyajikan pilihan kuliner Nusantara autentik dan menu Western pilihan yang memanjakan lidah.",
                "hours": "11:00 - 22:00 WIB",
                "priceRange": "Rp 35.000 - Rp 150.000",
                "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Panoramic Rooftop View Pemandangan Pegunungan & Kota",
                        "Menu Spesial Kuliner Nusantara & Signature Steak Western",
                        "Ruang VIP Dining Privat untuk Pertemuan Keluarga / Bisnis",
                        "Pilihan Mocktail Segar & Minuman Tradisional Rempah",
                        "Suasana Romantis & Hangat untuk Makan Malam",
                        "Bisa Direservasi untuk Private Event & Gathering"
                ],
                "location": "Rooftop Floor, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "technocoffee",
                "name": "Betterfly Rooftop Cafe",
                "category": "fnb",
                "badge": "Sunset Rooftop Lounge",
                "shortDesc": "Cafe santai rooftop dengan pemandangan senja estetik, live music berkala, mocktails, dan aneka racikan kopi kekinian.",
                "description": "Betterfly Rooftop Cafe adalah tempat favorit generasi muda dan mahasiswa untuk menikmati sunset sore, berbincang santai, atau mengerjakan tugas di ruang terbuka. Ditemani alunan musik akustik, aneka snack kekinian, dan kopi racikan barista terampil.",
                "hours": "15:00 - 23:00 WIB",
                "priceRange": "Rp 22.000 - Rp 50.000",
                "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Spot Terbaik Menikmati Sunset di Jatinangor",
                        "Live Acoustic Music & Community Performance",
                        "Pilihan Kopi Susu Gula Aren, Manual Brew, & Mocktails",
                        "Aneka Camilan (Platter, Churros, French Fries, Dimsum)",
                        "Area Outdoor Luas dengan Angin Sejuk Alami",
                        "Free WiFi Cepat & Banyak Colokan Listrik"
                ],
                "location": "Rooftop Open Area, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "frozenfood",
                "name": "Jayanti Coffee & Eatery",
                "category": "fnb",
                "badge": "Coffee & Casual Dine",
                "shortDesc": "Spot kopi nyaman untuk santap siang, obrolan santai, dan hidangan comfort food nusantara bercita rasa autentik.",
                "description": "Jayanti Coffee & Eatery menyajikan konsep bersantap kasual dengan sajian menu makanan rumahan nusantara yang lezat dan kopi lokal premium. Tempat yang ramah dan nyaman untuk santap siang bersama rekan kerja maupun santai sore.",
                "hours": "09:00 - 21:00 WIB",
                "priceRange": "Rp 20.000 - Rp 60.000",
                "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Menu Nasi Nusantara (Nasi Liwet, Nasi Timbel, Ayam Bakar)",
                        "Kopi Seduh Segar dari Biji Kopi Priangan Jawa Barat",
                        "Ruangan Indoor Ber-AC & Area Semi Outdoor",
                        "Paket Makan Siang Hemat untuk Mahasiswa & Pegawai",
                        "Pelayanan Cepat & Ramah",
                        "Tersedia Kemasan Takeaway Higienis"
                ],
                "location": "Lantai 1, Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "santapin",
                "name": "Santapin Mealbox",
                "category": "fnb",
                "badge": "Daily Balanced Nutrition",
                "shortDesc": "Paket makan siang bergizi higienis dengan takaran kalori seimbang, cocok untuk konsumsi harian kantor dan mahasiswa.",
                "description": "Santapin menghadirkan solusi makan sehat harian siap saji dengan takaran nutrisi yang dihitung cermat. Menggunakan bahan-bahan segar organik dari petani lokal tanpa tambahan MSG berlebih.",
                "hours": "09:00 - 15:00 WIB",
                "priceRange": "Rp 25.000 - Rp 45.000",
                "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Menu Sehat Berganti Tiap Hari (Healthy Daily Catering)",
                        "Perhitungan Kalori & Takaran Protein / Sayur Seimbang",
                        "Kemasan Ramah Lingkungan (Eco-Friendly Packaging)",
                        "Langganan Mingguan / Bulanan dengan Pengantaran Tepat Waktu",
                        "Pilihan Menu Low Carb, High Protein, & Vegetarian",
                        "Higienis & Bebas Pengawet"
                ],
                "location": "Technolife Building Jatinangor",
                "active": true
        },
        {
                "id": "gampangenak",
                "name": "Gampang Enak Food Hub",
                "category": "fnb",
                "badge": "Fast Casual Indonesian Food",
                "shortDesc": "Sajian kuliner nusantara cepat saji dengan harga ramah dan porsi mengenyangkan untuk kebutuhan harian para profesional.",
                "description": "Gampang Enak adalah food court hub modern yang menyediakan aneka hidangan cepat saji favorit Indonesia: mie ayam, bakso, nasi goreng, aneka rice bowl, dan gorengan hangat dengan harga yang sangat terjangkau.",
                "hours": "10:00 - 21:00 WIB",
                "priceRange": "Rp 18.000 - Rp 38.000",
                "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
                "gallery": [
                        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80"
                ],
                "features": [
                        "Pilihan Lengkap Kuliner Favorit Nusantara Cepat Saji",
                        "Harga Sangat Bersahabat untuk Mahasiswa & Pegawai",
                        "Sistem Pemesanan Cepat & Cashless Payment",
                        "Area Makan Bersih, Luas & Nyaman",
                        "Porsi Mengenyangkan dengan Bahan Berkualitas",
                        "Tersedia untuk Layanan Pesan Antar / Takeaway"
                ],
                "location": "Food Court Area Lantai 1, Technolife Building",
                "active": true
        }
],
    portfolio: [
        {
            id: "port-1",
            title: "Inisiatif Dapur Satelit & Program Gizi Terpadu",
            category: "sustainability",
            badge: "Program Pemerintah & Nutrisi",
            shortDesc: "Penyediaan fasilitas dapur satelit terstandarisasi untuk mendukung program makanan bergizi berskala regional.",
            fullDesc: "Kolaborasi strategis pengelolaan Dapur Satelit modern bersama pemerintah daerah untuk penyediaan makanan bergizi, higienis, dan tersertifikasi secara masif.",
            image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1000&auto=format&fit=crop&q=80",
            colSpan: 8,
            featured: true,
            year: "2024"
        },
        {
            id: "port-2",
            title: "Penyelenggaraan Wisuda & Seminar Akademik Akbar",
            category: "commercial",
            badge: "Event & Conference",
            shortDesc: "Penyelenggaraan acara wisuda dan konferensi ilmiah ratusan wisudawan perguruan tinggi ternama di Bhimasena Ballroom.",
            fullDesc: "Penyelenggaraan wisuda akbar dan simposium nasional bekerja sama dengan berbagai universitas di kawasan pendidikan Jatinangor dengan fasilitas multimedia 4K.",
            image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1000&auto=format&fit=crop&q=80",
            colSpan: 4,
            featured: false,
            year: "2024"
        },
        {
            id: "port-3",
            title: "Inkubasi & Sentra Pameran UMKM Kreatif",
            category: "infrastructure",
            badge: "Community & Business Hub",
            shortDesc: "Pemberdayaan ratusan pelaku usaha UMKM lokal Jawa Barat melalui fasilitas display produk dan pelatihan digital.",
            fullDesc: "Program inkubasi dan fasilitasi promosi produk lokal melalui area pameran Plaza Exhibition serta workshop digitalisasi pemasaran bisnis.",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80",
            colSpan: 4,
            featured: false,
            year: "2023"
        },
        {
            id: "port-4",
            title: "Produksi Konten Kreatif & Podcast Nasional",
            category: "technology",
            badge: "Digital Media & Studio",
            shortDesc: "Produksi siaran podcast dan konten audiovisual bersama kreator, narasumber nasional, dan instansi pendidikan.",
            fullDesc: "Pemanfaatan studio audio-visual Deco.in dengan teknologi recording modern untuk berbagai program talkshow, live streaming, dan video edukatif.",
            image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1000&auto=format&fit=crop&q=80",
            colSpan: 4,
            featured: false,
            year: "2024"
        }
    ],
    careers: [
        {
            id: "job-1",
            title: "Facility & Event Operations Coordinator",
            dept: "Facility & Venue Management",
            location: "Jatinangor Hub",
            type: "Full-Time",
            deadline: "30 Okt 2026",
            desc: "Bertanggung jawab atas koordinasi operasional ballroom, meeting room, dan kesiapan fasilitas acara client.",
            status: "Active"
        },
        {
            id: "job-2",
            title: "F&B Barista & Service Captain",
            dept: "Hospitality & Dining",
            location: "Jatinangor (Kals Maison / Skywatch)",
            type: "Full-Time",
            deadline: "15 Nov 2026",
            desc: "Menjaga kualitas racikan specialty coffee, standar hospitality, dan kenyamanan pengunjung resto/cafe.",
            status: "Active"
        },
        {
            id: "job-3",
            title: "Digital Marketing & Creative Content Specialist",
            dept: "Marketing & Media",
            location: "Jatinangor Hub",
            type: "Full-Time",
            deadline: "20 Nov 2026",
            desc: "Membuat strategi promosi media sosial, produksi konten visual di studio, dan kampanye digital event Technolife.",
            status: "Active"
        }
    ],
    team: [
        {
            id: "team-1",
            name: "Evi Lusviana",
            title: "Founder & Owner",
            bio: "Pendiri Technolife Group dan Direktur Bhimasena Research & Technology, memimpin visi integrasi fasilitas dan ekosistem bisnis modern.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
        },
        {
            id: "team-2",
            name: "Surahman Novianto",
            title: "Direktur Utama",
            bio: "Memimpin tata kelola operasional korporat, sinergi bisnis fasilitas, dan pengembangan kemitraan strategis di seluruh lini Technolife.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
        },
        {
            id: "team-3",
            name: "H. Deni Hidayat",
            title: "Direktur Technolife Media Utama",
            bio: "Mengarahkan unit media, industri kreatif, produksi konten audiovisual, dan komunikasi publik terintegrasi.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80"
        }
    ],
    bookings: [
        {
            id: "bkg-101",
            customerName: "Raditya Pratama",
            customerEmail: "raditya.p@bumn.co.id",
            customerPhone: "081234567890",
            serviceName: "Grand Ballroom",
            date: "2026-09-25",
            time: "09:00 - 17:00",
            pax: "450",
            notes: "Perlu tata suara gala dinner dan konfigurasi meja round-table.",
            status: "Pending",
            createdAt: "2026-09-14 10:20"
        },
        {
            id: "bkg-102",
            customerName: "Siti Rahmawati",
            customerEmail: "siti.rahma@startup.id",
            customerPhone: "081399887766",
            serviceName: "Meeting Room A",
            date: "2026-09-18",
            time: "13:00 - 16:00",
            pax: "12",
            notes: "Meeting board investor, minta disiapkan proyektor 4K & coffee break.",
            status: "Confirmed",
            createdAt: "2026-09-13 14:45"
        },
        {
            id: "bkg-103",
            customerName: "Kevin Sanjaya",
            customerEmail: "kevin.s@agency.com",
            customerPhone: "085677889900",
            serviceName: "Technobillyard VIP Table",
            date: "2026-09-15",
            time: "19:00 - 22:00",
            pax: "6",
            notes: "Gathering tim bulanan santai.",
            status: "Completed",
            createdAt: "2026-09-12 11:30"
        }
    ],
    inquiries: [
        {
            id: "inq-201",
            type: "Partnership",
            name: "PT Danareksa Global",
            pic: "Budi Santoso",
            email: "budi.s@danareksa-global.co.id",
            phone: "081122334455",
            subject: "Penawaran Kolaborasi Coworking & F&B Regional",
            message: "Tertarik menjalin kemitraan strategis pembukaan hub baru Technolife di kawasan Surabaya Barat.",
            status: "Pending",
            createdAt: "2026-09-14 08:15"
        },
        {
            id: "inq-202",
            type: "Contact",
            name: "Anisa Larasati",
            pic: "Anisa Larasati",
            email: "anisa.l@gmail.com",
            phone: "081900112233",
            subject: "Pertanyaan Paket Katering Pernikahan",
            message: "Mohon info paket lengkap Catering Brown Sugar untuk resepsi bulan Desember di Ballroom.",
            status: "Confirmed",
            createdAt: "2026-09-13 16:30"
        }
    ],
    applicants: [
        {
            id: "app-301",
            jobId: "job-1",
            jobTitle: "Senior Solutions Architect",
            name: "Dimas Anggara",
            email: "dimas.tech@gmail.com",
            phone: "081298765432",
            portfolioUrl: "https://linkedin.com/in/dimas-arch",
            experience: "7 Tahun di Cloud & Distributed Systems",
            status: "Interview",
            appliedAt: "2026-09-13 11:00"
        }
    ]
};

// Store Manager Object
const TechnoDataStore = {
    // 1. Initializer
    init() {
        try {
            const raw = localStorage.getItem(TECHNO_STORAGE_KEY);
            if (!raw) {
                this.saveAll(DEFAULT_STORE_DATA);
            }
        } catch (e) {
            console.error("Error accessing localStorage:", e);
        }
        return this.getAll();
    },

    // 2. Core Reader & Writer
    getAll() {
        try {
            const raw = localStorage.getItem(TECHNO_STORAGE_KEY);
            if (!raw) return DEFAULT_STORE_DATA;
            const parsed = JSON.parse(raw);
            // Ensure schema integrity by merging with defaults
            return {
                settings: { ...DEFAULT_STORE_DATA.settings, ...(parsed.settings || {}) },
                facilities: parsed.facilities && parsed.facilities.length ? parsed.facilities : DEFAULT_STORE_DATA.facilities,
                fnb: parsed.fnb && parsed.fnb.length ? parsed.fnb : DEFAULT_STORE_DATA.fnb,
                portfolio: parsed.portfolio && parsed.portfolio.length ? parsed.portfolio : DEFAULT_STORE_DATA.portfolio,
                careers: parsed.careers && parsed.careers.length ? parsed.careers : DEFAULT_STORE_DATA.careers,
                team: parsed.team && parsed.team.length ? parsed.team : DEFAULT_STORE_DATA.team,
                bookings: parsed.bookings || DEFAULT_STORE_DATA.bookings,
                inquiries: parsed.inquiries || DEFAULT_STORE_DATA.inquiries,
                applicants: parsed.applicants || DEFAULT_STORE_DATA.applicants
            };
        } catch (e) {
            console.error("Error parsing store data:", e);
            return DEFAULT_STORE_DATA;
        }
    },

    saveAll(data) {
        try {
            localStorage.setItem(TECHNO_STORAGE_KEY, JSON.stringify(data));
            // Dispatch a window event so all open tabs or listening components re-render immediately
            window.dispatchEvent(new CustomEvent('technoStoreUpdated', { detail: data }));
            return true;
        } catch (e) {
            console.error("Failed to save to localStorage:", e);
            alert("Penyimpanan gagal. Memori browser mungkin penuh jika gambar terlalu besar.");
            return false;
        }
    },

    // Dipakai bridge Supabase setelah data cloud berhasil dibaca. Tidak menulis balik ke cloud.
    hydrate(data) {
        try {
            localStorage.setItem(TECHNO_STORAGE_KEY, JSON.stringify(data));
            window.dispatchEvent(new CustomEvent('technoStoreUpdated', { detail: data }));
            return true;
        } catch (e) {
            console.error('Failed to hydrate cloud data:', e);
            return false;
        }
    },

    // 3. Facilities
    getFacilities() {
        return this.getAll().facilities;
    },
    getFacilityById(id) {
        return this.getFacilities().find(f => f.id === id);
    },
    updateFacility(id, updatedFields) {
        const data = this.getAll();
        const index = data.facilities.findIndex(f => f.id === id);
        if (index !== -1) {
            data.facilities[index] = { ...data.facilities[index], ...updatedFields };
            this.saveAll(data);
            return data.facilities[index];
        }
        return null;
    },

    // 4. Food & Beverage
    getFnb() {
        return this.getAll().fnb;
    },
    getFnbById(id) {
        return this.getFnb().find(f => f.id === id);
    },
    updateFnb(id, updatedFields) {
        const data = this.getAll();
        const index = data.fnb.findIndex(f => f.id === id);
        if (index !== -1) {
            data.fnb[index] = { ...data.fnb[index], ...updatedFields };
            this.saveAll(data);
            return data.fnb[index];
        }
        return null;
    },

    // 5. Portfolio
    getPortfolio() {
        return this.getAll().portfolio;
    },
    addPortfolio(item) {
        const data = this.getAll();
        const newId = 'port-' + Date.now();
        const newItem = {
            id: newId,
            colSpan: 4,
            featured: false,
            year: new Date().getFullYear().toString(),
            ...item
        };
        data.portfolio.unshift(newItem);
        this.saveAll(data);
        return newItem;
    },
    updatePortfolio(id, updatedFields) {
        const data = this.getAll();
        const index = data.portfolio.findIndex(p => p.id === id);
        if (index !== -1) {
            data.portfolio[index] = { ...data.portfolio[index], ...updatedFields };
            this.saveAll(data);
            return data.portfolio[index];
        }
        return null;
    },
    deletePortfolio(id) {
        const data = this.getAll();
        data.portfolio = data.portfolio.filter(p => p.id !== id);
        this.saveAll(data);
        return true;
    },

    // 6. Careers
    getCareers() {
        return this.getAll().careers;
    },
    addCareer(job) {
        const data = this.getAll();
        const newJob = {
            id: 'job-' + Date.now(),
            status: 'Active',
            ...job
        };
        data.careers.unshift(newJob);
        this.saveAll(data);
        return newJob;
    },
    updateCareer(id, updatedFields) {
        const data = this.getAll();
        const index = data.careers.findIndex(c => c.id === id);
        if (index !== -1) {
            data.careers[index] = { ...data.careers[index], ...updatedFields };
            this.saveAll(data);
            return data.careers[index];
        }
        return null;
    },
    deleteCareer(id) {
        const data = this.getAll();
        data.careers = data.careers.filter(c => c.id !== id);
        this.saveAll(data);
        return true;
    },

    // 7. Team / Org Structure
    getTeam() {
        return this.getAll().team;
    },
    updateTeamMember(id, updatedFields) {
        const data = this.getAll();
        const index = data.team.findIndex(t => t.id === id);
        if (index !== -1) {
            data.team[index] = { ...data.team[index], ...updatedFields };
            this.saveAll(data);
            return data.team[index];
        }
        return null;
    },

    // 8. Bookings
    getBookings() {
        return this.getAll().bookings;
    },
    addBooking(booking) {
        const data = this.getAll();
        const newBkg = {
            id: 'bkg-' + Math.floor(100 + Math.random() * 900),
            status: 'Pending',
            createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            ...booking
        };
        data.bookings.unshift(newBkg);
        this.saveAll(data);
        return newBkg;
    },
    updateBookingStatus(id, newStatus) {
        const data = this.getAll();
        const item = data.bookings.find(b => b.id === id);
        if (item) {
            item.status = newStatus;
            this.saveAll(data);
            return true;
        }
        return false;
    },
    deleteBooking(id) {
        const data = this.getAll();
        data.bookings = data.bookings.filter(b => b.id !== id);
        this.saveAll(data);
        return true;
    },

    // 9. Inquiries
    getInquiries() {
        return this.getAll().inquiries;
    },
    addInquiry(inquiry) {
        const data = this.getAll();
        const newInq = {
            id: 'inq-' + Math.floor(100 + Math.random() * 900),
            status: 'Pending',
            createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            ...inquiry
        };
        data.inquiries.unshift(newInq);
        this.saveAll(data);
        return newInq;
    },
    updateInquiryStatus(id, newStatus) {
        const data = this.getAll();
        const item = data.inquiries.find(i => i.id === id);
        if (item) {
            item.status = newStatus;
            this.saveAll(data);
            return true;
        }
        return false;
    },
    deleteInquiry(id) {
        const data = this.getAll();
        data.inquiries = data.inquiries.filter(i => i.id !== id);
        this.saveAll(data);
        return true;
    },

    // 10. Applicants
    getApplicants() {
        return this.getAll().applicants;
    },
    addApplicant(applicant) {
        const data = this.getAll();
        const newApp = {
            id: 'app-' + Math.floor(100 + Math.random() * 900),
            status: 'New',
            appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            ...applicant
        };
        data.applicants.unshift(newApp);
        this.saveAll(data);
        return newApp;
    },
    updateApplicantStatus(id, newStatus) {
        const data = this.getAll();
        const item = data.applicants.find(a => a.id === id);
        if (item) {
            item.status = newStatus;
            this.saveAll(data);
            return true;
        }
        return false;
    },

    // 11. Settings
    getSettings() {
        return this.getAll().settings;
    },
    updateSettings(updatedSettings) {
        const data = this.getAll();
        data.settings = { ...data.settings, ...updatedSettings };
        this.saveAll(data);
        return data.settings;
    },

    // 12. Backup, Restore, Reset
    resetToDefault() {
        this.saveAll(DEFAULT_STORE_DATA);
        return true;
    },
    exportJSON() {
        const json = JSON.stringify(this.getAll(), null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `technolife_backup_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },
    importJSON(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            if (!parsed.facilities || !parsed.fnb) {
                throw new Error("Format JSON tidak valid.");
            }
            this.saveAll(parsed);
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }
};

// Initialize immediately upon script evaluation
TechnoDataStore.init();

// Expose globally
window.TechnoDataStore = TechnoDataStore;

