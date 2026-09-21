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
        tagline: "Empowering Modern Enterprises Through Integrated Infrastructure, Workspaces & Lifestyle Solutions.",
        phone: "+62 21 5088 7700",
        whatsapp: "+62 811 8899 7700",
        email: "corporate@technolife.co.id",
        address: "Technolife Tower, Jl. Gatot Subroto Kav. 55-56, Jakarta Selatan 12950, Indonesia",
        workingHours: "Senin - Jumat: 08:00 - 18:00 WIB | Sabtu: 09:00 - 14:00 WIB",
        facebookUrl: "#",
        instagramUrl: "#",
        linkedinUrl: "#"
    },
    facilities: [
        {
            id: "needs",
            name: "Needs",
            badge: "Workspace Essentials",
            description: "Penyediaan sarana ruang kerja esensial dan layanan manajemen utilitas korporat menyeluruh.",
            specs: "Private & Shared",
            price: "Mulai Rp 1.500.000 / bln",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8iy8CqdbNeNm-vKzW6mpJQunbCoAX9z6B076NExP9sDxLKPT-SloNjD_njFk2JaUaPXUqZwh97FvlM1fzR6jpl4dtq80WLY7eilZ-T2kmgBzPI3-DyrWhXvipnOw9rWQczU8Kn27D1S-rBgnOCn-LUUZZmvzut62N4XDSTE8rbBgx6Fiyf25oftnB9Xmlsp0UEY-yicpZqOgs2srFpLnai5ylBzH0VW_a-o38kzykGr-44skhnLa3",
            active: true
        },
        {
            id: "studyspace",
            name: "Study Space",
            badge: "Focus Environment",
            description: "Ruang belajar dan riset berorientasi konsentrasi tinggi dengan meja ergonomis dan internet serat optik gigabit.",
            specs: "Acoustic Quiet Zone",
            price: "Mulai Rp 50.000 / hari",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArIB3--IhfkEqn7Ad0jTKgUsBqcoX1pYYpyZh6iu2Yq6hu6T-qFo7Y8BVkSU8opoYYPLHE4_or-dqW9bGf9XxnXPlnpPeheHR7KpTVBOyOYppiQBgFYI9l9-T-oXc_SJ2Z8Pdg3uNvgiAh2tEmy5-z0uqugHHjpwrAYeHyjBU_GiDoRrtLTv7n8muSQ__93WJ1DwJAP06d486qYAe9x4asFPz17No-UZW1p0xHBUs3IYJy-zUo_-7K",
            active: true
        },
        {
            id: "technobillyard",
            name: "Technobillyard",
            badge: "Recreation & Club",
            description: "Area rekreasi biliar eksklusif dan lounge eksekutif modern untuk melepas penat dan bersosialisasi selepas jam kerja.",
            specs: "Tournament Tables",
            price: "Rp 75.000 / jam",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnf-eBxIsnQKeiDquxroMVNqCp_1fBQcDEaizfq2TbYrE9fonlQRJdBoYWDVnU9vytQXz5zNDjOBMII_MWt4cuE4aqP9-X9X6WcB8pAIbqp7zG47UOUCobTdiNO6PyeOu56auBqwZ_Xeb6iHtD9WmIpml7J1nzRaLnTZsB1402gxA5-Pg3_ie8IMOjCZXXgdkVlsf1JgC6gh3diMjqZRhz1NRE-d5h3Cx5JCyksKHiZekSMATW9MgP",
            active: true
        },
        {
            id: "ballroom",
            name: "Ballroom",
            badge: "Grand Event Venue",
            description: "Grand ballroom megah berkapasitas hingga 1.500 tamu untuk seminar akbar, konferensi korporat, gala dinner, dan resepsi.",
            specs: "Up to 1,500 Pax",
            price: "Hubungi Penjualan",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxC7BPzO9TQfs_mFTXcYm_qflIXpfToFkCNq8pqb4S4Qprb2qRfnHNxaG0_WMJ3JqXLcPasgpnXAWwoeuNf21QAkeqjZWyKRMsnNDMy4JH1zavGF8OVwNWH3gqzc2h8JsVB0Rt7JjLz-4kSjBErYSn4FmULiqAjB8exf2o63KfcZM1fPDxdYw2n17S8FOxXBbR3XodiF0gcAIzsRvI2hhCnA3G9KlxqoaeZbDR3DONG9FuTJCF7UPm",
            active: true
        },
        {
            id: "trainingcenter",
            name: "Training Center",
            badge: "Executive Learning",
            description: "Pusat pelatihan terintegrasi dengan proyektor interaktif 4K, tata suara profesional, dan konfigurasi modular.",
            specs: "30 - 100 Peserta",
            price: "Mulai Rp 2.500.000 / sesi",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3Sal7CC0EroSgawjiJXyVeIgoWz6TFOEJCVIP-KCEqvcMJ24Ec0mnbByfsOXJDvtWfIB6__dY0pad-9MrxpxIIO5WlCj_lqQFZX0YCgxp1a6yuNZOzhRlo9mbAdH6V_Df4RSRc9yGas82YvhY0mPCMlHPVjo49ViRTa2djXe-jC6JmgaUNeHboBpGmFY9tOM-uHdH8oKtRBn_AOu5Tkzz_7h4MKfjKjFYn_aFBC-lwBN0DgxogQtc",
            active: true
        },
        {
            id: "technofit",
            name: "Techno Fit",
            badge: "Health & Fitness",
            description: "Fasilitas kebugaran korporat modern dengan instruktur bersertifikat, zona kardio canggih, dan ruang ganti mewah.",
            specs: "Gym & Wellness",
            price: "Mulai Rp 350.000 / bln",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC2bF11x2n603wO71q19N6s7_P7N2G0n6836y8J4A9F2c8L2H9J4n6D5K1-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1-9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        },
        {
            id: "decoin",
            name: "Deco.in",
            badge: "Interior & Architecture",
            description: "Layanan perancangan tata ruang estetis, pengadaan furnitur ergonomis, dan dekorasi komersial berstandar internasional.",
            specs: "Custom Consultation",
            price: "Estimasi Berdasarkan Proyek",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDK04H_M29Q7A3Z-N3L9B8v5C4R7D6E1-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1-9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        },
        {
            id: "meetingroom",
            name: "Meeting Room",
            badge: "Smart Conference",
            description: "Ruang rapat kedap suara dilengkapi kamera konferensi AI, smart screen kolaboratif, dan dukungan barista.",
            specs: "6 - 24 Orang",
            price: "Mulai Rp 200.000 / jam",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANhG3V5F8Y0c2E5K7B9-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1-9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        },
        {
            id: "coworking",
            name: "Coworking",
            badge: "Agile Workspace",
            description: "Ekosistem kerja fleksibel dengan hot desk dinamis, area networking kolaboratif, free-flow coffee, dan akses 24/7.",
            specs: "Flexible Desks",
            price: "Mulai Rp 100.000 / hari",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_E8Y7C6X5V4Z3A2B1-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1-9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        },
        {
            id: "virtualoffice",
            name: "Virtual Office",
            badge: "Prime Business Address",
            description: "Alamat prestisius di pusat bisnis Jakarta dengan layanan penanganan surat dokumen, resepsionis, dan kuota ruang rapat bulanan.",
            specs: "CBD Legal Address",
            price: "Mulai Rp 450.000 / bln",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE9F8A7D6C5B4E3A2-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1-9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        }
    ],
    fnb: [
        {
            id: "cateringbrownsugar",
            name: "Catering Brown Sugar",
            badge: "Corporate Catering",
            description: "Layanan katering premium untuk gala dinner, rapat direksi, resepsi pernikahan, dan prasmanan harian kantor.",
            hours: "Pemesanan H-2 | Pengiriman 06:00 - 20:00",
            priceRange: "Mulai Rp 45.000 / porsi",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK_F5A8E7D6C5B4E3A2-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        },
        {
            id: "kallsmaison",
            name: "Kall's Maison",
            badge: "Artisanal Bakery & Cafe",
            description: "Pastry khas Prancis autentik, sourdough hangat, croissant berlapis renyah, dan dessert mewah yang dipanggang segar setiap pagi.",
            hours: "07:00 - 21:00 WIB",
            priceRange: "Rp 25.000 - Rp 85.000",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ0A9B8C7D6E5F4G3-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        },
        {
            id: "skywatchresto",
            name: "Skywatch Resto",
            badge: "Panoramic Rooftop Dining",
            description: "Restoran rooftop dengan pemandangan cakrawala kota metropolitan, menyajikan hidangan fusion internasional kontemporer.",
            hours: "11:00 - 23:00 WIB",
            priceRange: "Rp 95.000 - Rp 350.000",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuE1B2C3D4E5F6G7H8-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        },
        {
            id: "technocoffee",
            name: "Techno Coffee",
            badge: "Specialty Coffee Bar",
            description: "Kopi artisan dari biji pilihan Nusantara dan single origin dunia, diracik barista berpengalaman untuk menemani hari produktif.",
            hours: "07:30 - 20:00 WIB",
            priceRange: "Rp 28.000 - Rp 55.000",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuF2C3D4E5F6G7H8I9-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        },
        {
            id: "frozenfood",
            name: "Frozen Food",
            badge: "Gourmet Packaged Meals",
            description: "Hidangan siap saji premium beku higienis, diracik tanpa bahan pengawet dengan standar keamanan pangan tertinggi.",
            hours: "08:00 - 20:00 WIB",
            priceRange: "Rp 35.000 - Rp 120.000",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuG3D4E5F6G7H8I9J0-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        },
        {
            id: "santapin",
            name: "Santapin",
            badge: "Healthy Lunchbox Express",
            description: "Paket makan siang sehat bergizi seimbang dengan kalkulasi kalori akurat, dikirim tepat waktu ke meja kerja Anda.",
            hours: "Senin - Sabtu: 09:00 - 15:00 WIB",
            priceRange: "Rp 38.000 - Rp 65.000",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuH4E5F6G7H8I9J0K1-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        },
        {
            id: "gampangenak",
            name: "Gampang Enak",
            badge: "Fast-Casual Comfort Food",
            description: "Sajian kuliner lokal Nusantara yang lezat, cepat saji, dan terjangkau untuk kebutuhan bersantap sehari-hari profesional muda.",
            hours: "10:00 - 21:00 WIB",
            priceRange: "Rp 22.000 - Rp 48.000",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuI5F6G7H8I9J0K1L2-9F2c8L2H9J4n6D5K1_9F2c8L2H9J4n6D5K1=w800-h500-c",
            active: true
        }
    ],
    portfolio: [
        {
            id: "port-1",
            title: "Nexus Corporate Park",
            category: "infrastructure",
            badge: "Infrastructure",
            shortDesc: "A master-planned sustainable business hub integrating smart grid technology and expansive green spaces.",
            fullDesc: "A master-planned sustainable business hub integrating smart grid technology, automated climate zones, and expansive botanical green spaces spanning over 45 hectares.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5ZlTI_XcQW0a4EIis5KtsJOTFjCQdMtgUfyYsclAQWs17M0cb8_Rk_mi_pbJ9XKQdXhnFADDtuSe7F37AMcYXqEG_8dM_RiSifG2JXwOXA2b3U4CSsTgGB3emIXtrWoG2mnrHl9tLqqVhzqyLvI5Fzgxtz3Grjwpfr4kSb84gMnpsX2lCh-bweJKg9DARgQI7_ngIiKZ9Ab6Wu520F2cH4FJXVPwnawUlHQhC5l4C3lUQxwswHSPl",
            colSpan: 8,
            featured: true,
            year: "2024"
        },
        {
            id: "port-2",
            title: "DataCore Alpha",
            category: "technology",
            badge: "Technology",
            shortDesc: "Next-generation secure data storage & low-latency cloud infrastructure.",
            fullDesc: "Tier IV hyperscale modular data facility built with dual biometric access security, renewable liquid cooling, and redundant fiber links for financial enterprise tenants.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdZfapPVcjZIa1PpS9BBdVihlxtFOUciwWvAYEcEnePfcBCh7Rh4Pvvfb9ddaxBfrvyH_34Oh8fzfQyGWIMRxuzIKqgo6DPqLDdkyAHEl_hQb7CXLuLyqkNrZqzv75Uk4--GfsmGiHm5APUbUP_ZnKt6p9GAD4AJMt3xXib9QK5QiNN0ecd-8FHgOSeXQUTP8upacVu-fl5ut-Wt_wNWd2xwzSmucnEiHSjw_EpxNdHCb82FvdF7BZ",
            colSpan: 4,
            featured: false,
            year: "2024"
        },
        {
            id: "port-3",
            title: "Culinary Atrium",
            category: "commercial",
            badge: "Commercial Hospitality",
            shortDesc: "Redefining corporate dining with a focus on organic, locally sourced gastronomy.",
            fullDesc: "An innovative 1,500-seat multi-concept hospitality hall providing artisanal dining, cashless ordering kiosks, and curated executive private suites.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNBBfPtOaYk64g6mQDmJLr7pPZ0Qu6iUItZQ24xX_VBeqMPGxf-2OghIWk67TTx-C9QCyHCbrUFAjDkj0I5e6s_3VAGMJeii2v8RRAixGFrEv29BuakujxkPqol6a9mHpmdKywB2Zki1oQ3J6NNSJVRf8vBETBX7l-excC_7TgoNnsqL-nXwsS1T0u7vPx5XAC5WRh_twiNPtoHby45jN1V-btV7LcTOXEYifAUAPtF0aZGjQamNMe",
            colSpan: 4,
            featured: false,
            year: "2023"
        },
        {
            id: "port-4",
            title: "EcoGrid Initiative",
            category: "sustainability",
            badge: "Sustainability",
            shortDesc: "Pioneering self-sustaining clean energy solutions for modern urban commercial campuses.",
            fullDesc: "Rooftop solar photovoltaic arrays coupled with battery energy storage systems, cutting commercial building grid load by 42%.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHV5ChYYu-iS02c2CY369OkORigVSAFXBjceldWWz4QIEtSMbDGnAF2k7VKRzQjT6X8L_81AxRNRdMs2qhfRsYWjulIL2ESAgoISz-lla-zz6MaW-FdrHD7t9_znLB4tknu7B5RyRxZ9eHt8n_aZREA-wA_0LiVQFSgwFUoW7NKhnjqyejn_sFdzuTNC-8vGGzPV0q6L5PFlX0pqU5FuHmDg6IlfSdJujU70p_mHLI8dRRKNPpXCQ3",
            colSpan: 4,
            featured: false,
            year: "2023"
        },
        {
            id: "port-5",
            title: "Project Vertex",
            category: "infrastructure",
            badge: "Infrastructure",
            shortDesc: "Flagship 60-story commercial tower under development featuring kinetic facade thermal insulation.",
            fullDesc: "Flagship 60-story commercial tower under development featuring kinetic facade thermal insulation and zero-emission transit links.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD_HCZxZfJYPNGG0ssGdv6texVnj34pHEmdoBOC44Eh5FbU5wmDuZC5vfo3LKKsSdhA69bBQC3N1eWrwqrf_EuqK16PahDI98-oy1ZgCJIBoWX3Yx7OqPVs3mftj1_H9EpwPgqWjjUyyM82SbMOEAPvYt_QB524PLGexRxE_lkJ8y39q8LKJ8xb1JiXdfsKjmb4LkGnyykYMHyBJ6JM1b8hbKBnJvesN9ECtsGjZsvzy9ItJjMwE77",
            colSpan: 4,
            featured: false,
            year: "2024"
        }
    ],
    careers: [
        {
            id: "job-1",
            title: "Senior Solutions Architect",
            dept: "Technology & Cloud Services",
            location: "Jakarta HQ / Hybrid",
            type: "Full-Time",
            deadline: "30 Sep 2026",
            desc: "Memimpin perancangan infrastruktur cloud hybrid, arsitektur microservices berskala tinggi, dan sistem keamanan TI korporat.",
            status: "Active"
        },
        {
            id: "job-2",
            title: "Brand Experience Director",
            dept: "Hospitality & Lifestyle",
            location: "Jakarta Selatan",
            type: "Full-Time",
            deadline: "15 Oct 2026",
            desc: "Mengembangkan standar operasional layanan, strategi kurasi kuliner F&B, dan kepuasan pengalaman tamu di seluruh properti Technolife.",
            status: "Active"
        },
        {
            id: "job-3",
            title: "BIM & Sustainable Architecture Specialist",
            dept: "Infrastructure & Spaces",
            location: "Bandung Hub",
            type: "Full-Time",
            deadline: "20 Oct 2026",
            desc: "Mengintegrasikan model BIM 3D dengan standar efisiensi energi bangunan hijau (Green Building LEED) untuk pengembangan fasilitas baru.",
            status: "Active"
        }
    ],
    team: [
        {
            id: "team-1",
            name: "Ir. Hendra Wijaya, M.Sc.",
            title: "Chief Executive Officer & Founder",
            bio: "Berpengalaman lebih dari 25 tahun dalam bidang rekayasa konstruksi, teknologi terapan, dan ekspansi korporasi multinasional.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        },
        {
            id: "team-2",
            name: "Dra. Maya Suryanegara, MBA",
            title: "Chief Operating Officer",
            bio: "Memimpin efisiensi operasional harian, integrasi rantai pasok F&B, serta standardisasi layanan properti korporat.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
        },
        {
            id: "team-3",
            name: "Bambang Trihatmojo, S.T.",
            title: "Director of Infrastructure & Spaces",
            bio: "Arsitek senior yang mengawasi perencanaan fasilitas cerdas, perancangan ruang kerja modern, dan proyek perhotelan.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
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

