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
            id: "needs",
            name: "Needs & Office Essentials",
            badge: "Workspace Essentials",
            description: "Penyediaan sarana ruang kerja esensial, perlengkapan kantor modern, dan manajemen utilitas terpadu.",
            specs: "Private & Dedicated",
            price: "Mulai Rp 1.500.000 / bln",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "studyspace",
            name: "Study Space",
            badge: "Focus Environment",
            description: "Ruang belajar dan riset akustik tenang dengan kursi ergonomis, meja privat, stopkontak mandiri, dan internet serat optik gigabit.",
            specs: "Acoustic Quiet Zone",
            price: "Mulai Rp 25.000 / sesi",
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "technobillyard",
            name: "Techno Billiard",
            badge: "Recreation & Lounge",
            description: "Area rekreasi biliar berstandar turnamen dan lounge eksekutif modern untuk relaksasi dan networking selepas aktivitas.",
            specs: "Standard Tournament Tables",
            price: "Rp 50.000 / jam",
            image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "ballroom",
            name: "Bhimasena Ballroom",
            badge: "Grand Event Venue",
            description: "Grand ballroom megah dan berkelas untuk resepsi pernikahan, wisuda kampus, konferensi nasional, dan gathering akbar korporat.",
            specs: "Kapasitas hingga 1.500 Tamu",
            price: "Hubungi Penjualan",
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "trainingcenter",
            name: "Training Center",
            badge: "Interactive Workshop",
            description: "Pusat pelatihan dan edukasi modern dengan smart screen interaktif 4K, sound system pro, dan layout kursi modular.",
            specs: "30 - 100 Peserta",
            price: "Mulai Rp 1.500.000 / sesi",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "technofit",
            name: "Techno Fit",
            badge: "Health & Fitness",
            description: "Pusat kebugaran dan gym modern dengan peralatan cardio, strength training lengkap, dan instruktur profesional.",
            specs: "Gym & Wellness Center",
            price: "Mulai Rp 200.000 / bln",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "decoin",
            name: "Deco.in Creative Studio",
            badge: "Creative & Production",
            description: "Studio foto, video production, live podcast recording, dan konsultasi penataan ruang visual kreatif.",
            specs: "Studio Recording & Lighting",
            price: "Mulai Rp 250.000 / jam",
            image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "meetingroom",
            name: "Smart Meeting Room",
            badge: "Executive Conference",
            description: "Ruang rapat kedap suara dilengkapi AI video conference camera, smart monitor, dan sajian coffee break.",
            specs: "Kapasitas 6 - 25 Orang",
            price: "Mulai Rp 150.000 / jam",
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "coworking",
            name: "Travail Coworking Space",
            badge: "Agile Workspace",
            description: "Ruang kerja fleksibel dengan hot desk, dedicated desk, private office 4-10 orang, free-flow beverage, dan high-speed internet.",
            specs: "Flexible & Private Office",
            price: "Mulai Rp 50.000 / hari",
            image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "virtualoffice",
            name: "Virtual Office",
            badge: "Legal Business Address",
            description: "Alamat domisili bisnis strategis di Jatinangor dengan layanan penerimaan dokumen/surat dan kuota pemakaian meeting room.",
            specs: "Legal Business Address",
            price: "Mulai Rp 350.000 / bln",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80",
            active: true
        }
    ],
    fnb: [
        {
            id: "cateringbrownsugar",
            name: "Dapur Satelit & Catering Brown Sugar",
            badge: "Corporate & Event Catering",
            description: "Layanan katering higienis untuk resepsi pernikahan, rapat instansi, program makan bergizi terpadu, dan prasmanan.",
            hours: "Pemesanan H-1 | Pengiriman 06:00 - 20:00 WIB",
            priceRange: "Mulai Rp 25.000 / porsi",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "kallsmaison",
            name: "Kals Maison (Bakery & Cafe)",
            badge: "Artisanal Bakery",
            description: "Pastry khas Prancis autentik, croissant hangat berlapis mentega, sourdough, cake premium, dan specialty coffee.",
            hours: "08:00 - 21:00 WIB",
            priceRange: "Rp 20.000 - Rp 65.000",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "skywatchresto",
            name: "Skywatch Resto",
            badge: "Panoramic Rooftop Dining",
            description: "Restoran rooftop berpanorama pegunungan Jatinangor, menyajikan ragam hidangan khas Nusantara pilihan dan Western favorit.",
            hours: "11:00 - 22:00 WIB",
            priceRange: "Rp 35.000 - Rp 150.000",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "technocoffee",
            name: "Betterfly Rooftop Cafe",
            badge: "Sunset Rooftop Lounge",
            description: "Cafe santai rooftop dengan pemandangan senja estetik, live music berkala, mocktails, dan aneka racikan kopi kekinian.",
            hours: "15:00 - 23:00 WIB",
            priceRange: "Rp 22.000 - Rp 50.000",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "frozenfood",
            name: "Jayanti Coffee & Eatery",
            badge: "Coffee & Casual Dine",
            description: "Spot kopi nyaman untuk santap siang, obrolan santai, dan hidangan comfort food nusantara bercita rasa autentik.",
            hours: "09:00 - 21:00 WIB",
            priceRange: "Rp 20.000 - Rp 60.000",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "santapin",
            name: "Santapin Mealbox",
            badge: "Daily Balanced Nutrition",
            description: "Paket makan siang bergizi higienis dengan takaran kalori seimbang, cocok untuk konsumsi harian kantor dan mahasiswa.",
            hours: "09:00 - 15:00 WIB",
            priceRange: "Rp 25.000 - Rp 45.000",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&auto=format&fit=crop&q=80",
            active: true
        },
        {
            id: "gampangenak",
            name: "Gampang Enak Food Hub",
            badge: "Fast Casual Indonesian Food",
            description: "Sajian kuliner nusantara cepat saji dengan harga ramah dan porsi mengenyangkan untuk kebutuhan harian para profesional.",
            hours: "10:00 - 21:00 WIB",
            priceRange: "Rp 18.000 - Rp 38.000",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&auto=format&fit=crop&q=80",
            active: true
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

