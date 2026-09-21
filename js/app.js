/**
 * Technolife Group - Interactive Application JavaScript
 * Handles modals, mobile menu drawer, toast notifications, search,
 * form submissions, portfolio filters, and career applications.
 */

// Search Index Data for Instant Live Search
const SEARCH_INDEX = [
    // Facilities & Services
    { title: "Needs", category: "Facilities & Services", url: "services.html#needs", desc: "Corporate essential workspace and tailored enterprise facilities." },
    { title: "Study Space", category: "Facilities & Services", url: "services.html#studyspace", desc: "Dedicated high-focus study and learning space with high-speed internet." },
    { title: "Technobillyard", category: "Facilities & Services", url: "services.html#technobillyard", desc: "Premium billiard club, recreation, and modern executive entertainment." },
    { title: "Ballroom", category: "Facilities & Services", url: "services.html#ballroom", desc: "Grand multifunctional ballroom for galas, seminars, weddings, and corporate summits." },
    { title: "Training Center", category: "Facilities & Services", url: "services.html#trainingcenter", desc: "Equipped executive training suites, workshops, and certified seminar halls." },
    { title: "Techno Fit", category: "Facilities & Services", url: "services.html#technofit", desc: "State-of-the-art wellness centers and corporate gym facilities." },
    { title: "Deco.in", category: "Facilities & Services", url: "services.html#decoin", desc: "Interior design, aesthetic space decoration, and architecture solutions." },
    { title: "Meeting Room", category: "Facilities & Services", url: "services.html#meetingroom", desc: "Acoustic-treated smart meeting rooms with video conference technology." },
    { title: "Coworking", category: "Facilities & Services", url: "services.html#coworking", desc: "Dynamic shared hot-desks and dedicated team co-working hubs." },
    { title: "Virtual Office", category: "Facilities & Services", url: "services.html#virtualoffice", desc: "Prestigious CBD business address, mail handling, and call answering." },

    // Food & Beverage
    { title: "Catering Brown Sugar", category: "Food & Beverage", url: "services.html#cateringbrownsugar", desc: "Bespoke corporate event catering, banquets, and buffet culinary service." },
    { title: "Kall's Maison", category: "Food & Beverage", url: "services.html#kallsmaison", desc: "Artisanal pastries, French bakery delicacies, and signature coffee." },
    { title: "Skywatch Resto", category: "Food & Beverage", url: "services.html#skywatchresto", desc: "Rooftop panoramic dining with sky views and international cuisine." },
    { title: "Techno Coffee", category: "Food & Beverage", url: "services.html#technocoffee", desc: "Specialty roasted coffee bar crafted for productive workdays." },
    { title: "Frozen Food", category: "Food & Beverage", url: "services.html#frozenfood", desc: "Ready-to-cook gourmet packaged meals and hygienic frozen delicacies." },
    { title: "Santapin", category: "Food & Beverage", url: "services.html#santapin", desc: "Daily nutritious meals and corporate lunchbox delivery." },
    { title: "Gampang Enak", category: "Food & Beverage", url: "services.html#gampangenak", desc: "Convenient and flavorful fast-casual comfort meals for modern professionals." },

    // Profile & Company
    { title: "Profil dan Sejarah", category: "Profile", url: "history.html", desc: "Pioneering the intersection of architecture, technology, and human experience." },
    { title: "Struktur Organisasi", category: "Profile", url: "org-structure.html", desc: "Board of Directors and corporate governance framework." },
    { title: "Portfolio Proyek", category: "Profile", url: "portfolio.html", desc: "Showcase of enterprise infrastructure, tech, and sustainability projects." },
    { title: "Partnership", category: "Partnership", url: "partnerships.html", desc: "Strategic collaboration and global partner alliances." },
    { title: "Karir", category: "Karir", url: "careers.html", desc: "Open positions and professional development opportunities." },
    { title: "Kontak", category: "Kontak", url: "index.html#contact", desc: "Hubungi tim konsultan korporat Technolife Group." }
];

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (window.TechnoDataStore) {
        TechnoDataStore.init();
    }
    initModals();
    initMobileMenu();
    initMobileAccordion();
    initAuthSimulation();
    initToastContainer();
    initForms();
    initPortfolioFilters();
    initCareersSearch();
    initQuickSearch();
    syncPublicPagesWithStore();

    // Re-sync if store updates from another script or storage event
    window.addEventListener('technoStoreUpdated', () => {
        syncPublicPagesWithStore();
    });
    window.addEventListener('storage', (e) => {
        if (e.key === 'technolife_master_store_v1') {
            syncPublicPagesWithStore();
        }
    });
});

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function initToastContainer() {
    if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
}

function showToast(title, message, type = 'success') {
    initToastContainer();
    const container = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast-item p-4 rounded-xl shadow-lg border text-sm flex items-start gap-3 glass-panel ${
        type === 'success' ? 'border-primary/40 bg-white/95 text-on-surface' : 
        type === 'error' ? 'border-error/40 bg-error-container/90 text-on-error-container' : 
        'border-surface-variant bg-white/95 text-on-surface'
    }`;

    const iconName = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
    const iconColor = type === 'success' ? 'text-primary' : type === 'error' ? 'text-error' : 'text-secondary';

    toast.innerHTML = `
        <span class="material-symbols-outlined ${iconColor} text-xl flex-shrink-0">${iconName}</span>
        <div class="flex-grow">
            <h5 class="font-bold text-sm ${type === 'success' ? 'text-primary' : ''}">${title}</h5>
            <p class="text-xs text-secondary mt-0.5">${message}</p>
        </div>
        <button class="text-secondary hover:text-on-surface ml-2 focus:outline-none" onclick="this.parentElement.remove()">
            <span class="material-symbols-outlined text-base">close</span>
        </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastFadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}

/* ==========================================================================
   MODAL CONTROLLERS
   ========================================================================== */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('modal-hidden');
    modal.classList.add('modal-visible');
    document.body.style.overflow = 'hidden';

    // Autofocus first input if exists
    const input = modal.querySelector('input:not([type="hidden"]), textarea');
    if (input) setTimeout(() => input.focus(), 100);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hidden');
    document.body.style.overflow = '';
}

function initModals() {
    // Attach click listeners to all modal close triggers
    document.querySelectorAll('[data-close-modal]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const modal = trigger.closest('.modal-overlay');
            if (modal) closeModal(modal.id);
        });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.modal-visible').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });

    // Global triggers for Contact Us
    document.querySelectorAll('[data-open-contact]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('contactModal');
        });
    });

    // Global triggers for Log In
    document.querySelectorAll('[data-open-login]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('loginModal');
        });
    });

    // Global triggers for Quick Search
    document.querySelectorAll('[data-open-search]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('searchModal');
        });
    });
}

/* ==========================================================================
   MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
    const toggleBtns = document.querySelectorAll('[data-mobile-menu-toggle]');
    const drawer = document.getElementById('mobileNavDrawer');
    const backdrop = document.getElementById('mobileNavBackdrop');
    const closeBtn = document.getElementById('closeMobileNav');

    if (!drawer) return;

    function openMobileMenu() {
        drawer.classList.remove('-translate-x-full');
        if (backdrop) {
            backdrop.classList.remove('opacity-0', 'pointer-events-none');
            backdrop.classList.add('opacity-100', 'pointer-events-auto');
        }
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        drawer.classList.add('-translate-x-full');
        if (backdrop) {
            backdrop.classList.add('opacity-0', 'pointer-events-none');
            backdrop.classList.remove('opacity-100', 'pointer-events-auto');
        }
        document.body.style.overflow = '';
    }

    toggleBtns.forEach(btn => btn.addEventListener('click', openMobileMenu));
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (backdrop) backdrop.addEventListener('click', closeMobileMenu);
}

function initMobileAccordion() {
    document.querySelectorAll('[data-accordion-toggle]').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const parent = toggle.closest('.accordion-item');
            if (!parent) return;
            const isOpen = parent.classList.contains('accordion-open');
            
            if (isOpen) {
                parent.classList.remove('accordion-open');
                const icon = toggle.querySelector('.accordion-icon');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                parent.classList.add('accordion-open');
                const icon = toggle.querySelector('.accordion-icon');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

/* ==========================================================================
   AUTH SIMULATION (LOGIN & LOGOUT)
   ========================================================================== */
function initAuthSimulation() {
    const loginForm = document.getElementById('loginForm');
    const currentUser = localStorage.getItem('technolife_user');

    updateAuthUI(currentUser);

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail')?.value || 'admin@technolife.com';
            const username = email.split('@')[0];
            
            // Set user in local state
            localStorage.setItem('technolife_user', username);
            updateAuthUI(username);
            closeModal('loginModal');
            showToast('Welcome Back!', `Logged in successfully as ${username}.`, 'success');
            showToast('Login Berhasil!', `Selamat datang, ${username}. Mengarahkan ke Dashboard Admin...`, 'success');

            // Redirect to admin dashboard if admin login
            if (email.includes('admin') || username.toLowerCase() === 'admin') {
                setTimeout(() => {
                    window.location.href = 'admin/index.html';
                }, 800);
            }
        });
    }

    // Toggle password visibility
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const passwordInput = document.getElementById('loginPassword');
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePasswordBtn.textContent = isPassword ? 'visibility_off' : 'visibility';
        });
    }
}

function updateAuthUI(username) {
    document.querySelectorAll('[data-open-login]').forEach(btn => {
        if (username) {
            btn.innerHTML = `<span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm">account_circle</span> ${username}</span>`;
            btn.innerHTML = `<span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm">admin_panel_settings</span> ${username}</span>`;
            btn.title = "Buka Dashboard Admin";
            btn.onclick = (e) => {
                e.preventDefault();
                if (confirm(`Do you want to log out from account "${username}"?`)) {
                    localStorage.removeItem('technolife_user');
                    updateAuthUI(null);
                    showToast('Logged Out', 'You have been logged out safely.', 'info');
                }
                window.location.href = 'admin/index.html';
            };
        } else {
            btn.textContent = 'Log In';
            btn.title = "Masuk ke Akun / Admin";
            btn.onclick = (e) => {
                e.preventDefault();
                openModal('loginModal');
            };
        }
    });
}

/* ==========================================================================
   FORM HANDLERS (CONTACT, PARTNER, BOOKING, JOB APPLY)
   Integrated directly with TechnoDataStore for real-time admin sync.
   ========================================================================== */
function initForms() {
    // 1. Contact Us Modal Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName')?.value || 'Partner';
            const name = document.getElementById('contactName')?.value || 'Pengunjung';
            const email = document.getElementById('contactEmail')?.value || 'tamu@technolife.com';
            const phone = document.getElementById('contactPhone')?.value || '-';
            const subject = document.getElementById('contactSubject')?.value || 'Pertanyaan Umum';
            const message = document.getElementById('contactMessage')?.value || '';

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">sync</span> Sending...';
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">sync</span> Mengirim...';

            setTimeout(() => {
                // Save to central store
                if (window.TechnoDataStore) {
                    TechnoDataStore.addInquiry({
                        type: 'Contact',
                        name,
                        email,
                        phone,
                        subject,
                        message
                    });
                }

                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                contactForm.reset();
                closeModal('contactModal');
                showToast('Inquiry Received', `Thank you, ${name}. Our enterprise team will contact you within 24 hours.`, 'success');
            }, 800);
                showToast('Pesan Terkirim!', `Terima kasih, ${name}. Pesan Anda telah tersimpan dan diteruskan ke tim konsultan kami.`, 'success');
            }, 600);
        });
    }

    // 2. Partnership Application Form
    const partnerForm = document.getElementById('partnerInquiryForm');
    if (partnerForm) {
        partnerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const company = document.getElementById('partnerCompany')?.value || 'Your Company';
            const company = document.getElementById('partnerCompany')?.value || 'Perusahaan Mitra';
            const name = document.getElementById('partnerName')?.value || 'PIC';
            const email = document.getElementById('partnerEmail')?.value || '-';
            const phone = document.getElementById('partnerPhone')?.value || '-';
            const message = document.getElementById('partnerMessage')?.value || 'Proposal Kemitraan';

            const submitBtn = partnerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">sync</span> Processing...';
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">sync</span> Memproses...';

            setTimeout(() => {
                if (window.TechnoDataStore) {
                    TechnoDataStore.addInquiry({
                        type: 'Partnership',
                        name: company,
                        pic: name,
                        email,
                        phone,
                        subject: `Proposal Kemitraan: ${company}`,
                        message
                    });
                }

                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                partnerForm.reset();
                showToast('Partnership Proposal Sent', `Thank you! Strategic collaboration proposal for "${company}" has been routed to our corporate board.`, 'success');
            }, 1000);
                showToast('Proposal Kemitraan Terkirim!', `Terima kasih! Pengajuan kolaborasi "${company}" telah masuk ke antrean direksi Technolife.`, 'success');
            }, 800);
        });
    }

    // 3. Table / Space Booking Form (Services page)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const venue = document.getElementById('bookingVenue')?.value || 'Facility';
            const date = document.getElementById('bookingDate')?.value || 'Today';
            const venue = document.getElementById('bookingVenue')?.value || 'Fasilitas';
            const date = document.getElementById('bookingDate')?.value || new Date().toISOString().slice(0, 10);
            const time = document.getElementById('bookingTime')?.value || '10:00';
            const pax = document.getElementById('bookingPax')?.value || '1';
            const name = document.getElementById('bookingName')?.value || 'Pelanggan';
            const email = document.getElementById('bookingEmail')?.value || 'tamu@mail.com';
            const phone = document.getElementById('bookingPhone')?.value || '-';
            const notes = document.getElementById('bookingNotes')?.value || '';

            if (window.TechnoDataStore) {
                TechnoDataStore.addBooking({
                    serviceName: venue,
                    date,
                    time,
                    pax,
                    customerName: name,
                    customerEmail: email,
                    customerPhone: phone,
                    notes
                });
            }

            closeModal('bookingModal');
            bookingForm.reset();
            showToast('Reservation Confirmed', `Your booking request for ${venue} on ${date} is being arranged. Details sent to your email.`, 'success');
            showToast('Reservasi Berhasil!', `Permintaan reservasi ${venue} untuk tanggal ${date} telah masuk ke sistem admin Technolife.`, 'success');
        });
    }

    // 4. Job Application Modal Form
    const jobApplyForm = document.getElementById('jobApplyForm');
    if (jobApplyForm) {
        jobApplyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const jobTitle = document.getElementById('applyJobTitle')?.value || 'the role';
            const applicantName = document.getElementById('applyName')?.value || 'Candidate';
            const jobTitle = document.getElementById('applyJobTitle')?.value || 'Posisi';
            const applicantName = document.getElementById('applyName')?.value || 'Kandidat';
            const email = document.getElementById('applyEmail')?.value || '-';
            const phone = document.getElementById('applyPhone')?.value || '-';
            const portfolioUrl = document.getElementById('applyPortfolio')?.value || '';
            const experience = document.getElementById('applyExperience')?.value || '-';

            if (window.TechnoDataStore) {
                TechnoDataStore.addApplicant({
                    jobTitle,
                    name: applicantName,
                    email,
                    phone,
                    portfolioUrl,
                    experience
                });
            }

            closeModal('jobApplyModal');
            jobApplyForm.reset();
            showToast('Application Submitted', `Thank you, ${applicantName}! Your application for "${jobTitle}" has been received by Technolife HR.`, 'success');
            showToast('Lamaran Terkirim!', `Terima kasih, ${applicantName}! Lamaran Anda untuk posisi "${jobTitle}" telah tersimpan di sistem rekrutmen kami.`, 'success');
        });
    }
}

/* ==========================================================================
   PORTFOLIO FILTERING SYSTEM
   ========================================================================== */
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('[data-portfolio-filter]');
    const projectCards = document.querySelectorAll('[data-portfolio-category]');

    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-portfolio-filter');

            // Update button styles
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary/10', 'text-primary', 'border-primary/20');
                btn.classList.add('bg-surface-container', 'text-on-surface');
            });
            button.classList.add('bg-primary/10', 'text-primary', 'border', 'border-primary/20');
            button.classList.remove('bg-surface-container', 'text-on-surface');

            // Filter items with smooth fade effect
            projectCards.forEach(card => {
                const category = card.getAttribute('data-portfolio-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* ==========================================================================
   CAREERS SEARCH & APPLICATION
   ========================================================================== */
function initCareersSearch() {
    const searchInput = document.getElementById('careerSearchInput');
    const jobItems = document.querySelectorAll('[data-job-item]');

    if (searchInput && jobItems.length) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            jobItems.forEach(item => {
                const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
                const details = item.textContent.toLowerCase();
                const matches = title.includes(query) || details.includes(query);

                item.style.display = matches ? 'flex' : 'none';
                if (matches) visibleCount++;
            });

            const noResultEl = document.getElementById('noJobsFound');
            if (noResultEl) {
                noResultEl.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    }

    // Attach Apply Now button trigger
    document.querySelectorAll('[data-apply-job]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const jobTitle = button.getAttribute('data-apply-job') || 'Position';
            const titleField = document.getElementById('applyJobTitle');
            const displayTitle = document.getElementById('applyJobTitleDisplay');

            if (titleField) titleField.value = jobTitle;
            if (displayTitle) displayTitle.textContent = jobTitle;

            openModal('jobApplyModal');
        });
    });
}

/* ==========================================================================
   QUICK SEARCH MODAL SYSTEM
   ========================================================================== */
function initQuickSearch() {
    const searchInput = document.getElementById('quickSearchInput');
    const resultsContainer = document.getElementById('quickSearchResults');

    if (!searchInput || !resultsContainer) return;

    function renderResults(results) {
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="p-8 text-center text-secondary">
                    <span class="material-symbols-outlined text-4xl mb-2 text-surface-variant">search_off</span>
                    <p class="font-medium text-sm">No results found.</p>
                    <p class="text-xs mt-1">Try searching for "Facilities", "Dining", "Directors", or "Engineering".</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = results.map(item => `
            <a href="${item.url}" class="p-3 rounded-lg hover:bg-surface-container flex items-start justify-between gap-3 group transition-colors block border-b border-surface-variant/40 last:border-none">
                <div>
                    <div class="flex items-center gap-2">
                        <span class="font-semibold text-sm text-on-surface group-hover:text-primary transition-colors">${item.title}</span>
                        <span class="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">${item.category}</span>
                    </div>
                    <p class="text-xs text-secondary mt-1 line-clamp-1">${item.desc}</p>
                </div>
                <span class="material-symbols-outlined text-secondary group-hover:text-primary text-base group-hover:translate-x-0.5 transition-transform flex-shrink-0">chevron_right</span>
            </a>
        `).join('');
    }

    // Initial default results
    renderResults(SEARCH_INDEX.slice(0, 5));

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
            renderResults(SEARCH_INDEX.slice(0, 5));
            return;
        }

        const filtered = SEARCH_INDEX.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query)
        );

        renderResults(filtered);
    });
}

// Global helper for opening Booking modal with predefined venue
function openBookingModal(venueName) {
    const venueSelect = document.getElementById('bookingVenue');
    if (venueSelect && venueName) {
        venueSelect.value = venueName;
    }
    openModal('bookingModal');
}

// Global helper for opening Project details
function openProjectModal(title, category, description, imageUrl) {
    const modalTitle = document.getElementById('projectModalTitle');
    const modalCategory = document.getElementById('projectModalCategory');
    const modalDesc = document.getElementById('projectModalDesc');
    const modalImg = document.getElementById('projectModalImg');

    if (modalTitle) modalTitle.textContent = title;
    if (modalCategory) modalCategory.textContent = category;
    if (modalDesc) modalDesc.textContent = description;
    if (modalImg) modalImg.src = imageUrl;

    openModal('projectModal');
}

/* ==========================================================================
   LIVE STORE SYNCHRONIZATION WITH PUBLIC WEBSITE
   Ensures changes made in the Admin Dashboard (photos, texts, items)
   are reflected dynamically across all public pages.
   ========================================================================== */
function syncPublicPagesWithStore() {
    if (!window.TechnoDataStore) return;

    // 1. Sync Services Page (10 Facilities + 7 F&B)
    const facilities = TechnoDataStore.getFacilities();
    if (facilities && facilities.length) {
        facilities.forEach(f => {
            const card = document.getElementById(f.id);
            if (card) {
                // Update Photo
                const img = card.querySelector('img');
                if (img && f.image && img.src !== f.image) {
                    img.src = f.image;
                }
                // Update Title
                const title = card.querySelector('h3');
                if (title && f.name) {
                    title.textContent = f.name;
                }
                // Update Badge
                const badge = card.querySelector('.absolute.top-3 span') || card.querySelector('span[class*="rounded-full"]');
                if (badge && f.badge) {
                    badge.textContent = f.badge;
                }
                // Update Description
                const desc = card.querySelector('p');
                if (desc && f.description) {
                    desc.textContent = f.description;
                }
                // Update Specs
                const specs = card.querySelector('.border-t span.text-secondary') || card.querySelector('.mt-6 span.text-secondary');
                if (specs && f.specs) {
                    specs.textContent = f.specs;
                }
                // Active / Inactive
                if (f.active === false) {
                    card.style.opacity = '0.4';
                    card.style.pointerEvents = 'none';
                    card.title = 'Fasilitas sedang dalam pemeliharaan';
                } else {
                    card.style.opacity = '';
                    card.style.pointerEvents = '';
                }
            }
        });
    }

    const fnbItems = TechnoDataStore.getFnb();
    if (fnbItems && fnbItems.length) {
        fnbItems.forEach(f => {
            const card = document.getElementById(f.id);
            if (card) {
                const img = card.querySelector('img');
                if (img && f.image && img.src !== f.image) {
                    img.src = f.image;
                }
                const title = card.querySelector('h3');
                if (title && f.name) {
                    title.textContent = f.name;
                }
                const badge = card.querySelector('.absolute.top-3 span');
                if (badge && f.badge) {
                    badge.textContent = f.badge;
                }
                const desc = card.querySelector('p');
                if (desc && f.description) {
                    desc.textContent = f.description;
                }
                if (f.active === false) {
                    card.style.opacity = '0.4';
                    card.style.pointerEvents = 'none';
                } else {
                    card.style.opacity = '';
                    card.style.pointerEvents = '';
                }
            }
        });
    }

    // 2. Sync Portfolio Grid (portfolio.html)
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (portfolioGrid) {
        const projects = TechnoDataStore.getPortfolio();
        if (projects && projects.length) {
            portfolioGrid.innerHTML = projects.map(p => {
                const colSpanClass = p.colSpan === 8 ? 'md:col-span-8 min-h-[420px]' : 
                                     p.colSpan === 12 ? 'md:col-span-12 min-h-[440px]' : 'md:col-span-4 min-h-[420px]';
                const isLarge = p.colSpan >= 8;

                return `
                    <article data-portfolio-category="${p.category}" onclick="openProjectModal('${p.title.replace(/'/g, "\\'")}', '${(p.badge || p.category).replace(/'/g, "\\'")}', '${(p.fullDesc || p.shortDesc).replace(/'/g, "\\'")}', '${p.image}')" class="${colSpanClass} rounded-xl overflow-hidden bg-white ambient-shadow hover-ambient-shadow transition-all duration-300 group cursor-pointer relative">
                        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="background-image: url('${p.image}')"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-pure-black/85 via-pure-black/35 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 p-6 md:p-8 w-full glass-panel border-0 border-t border-white/20">
                            <div class="flex justify-between items-end">
                                <div>
                                    <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full font-label-sm text-label-sm text-white mb-3">
                                        ${p.badge || p.category}
                                    </span>
                                    <h2 class="font-headline-lg text-headline-lg text-white mb-2 group-hover:text-primary-fixed-dim transition-colors">
                                        ${p.title}
                                    </h2>
                                    <p class="font-body-md text-body-md text-white/80 max-w-xl line-clamp-2">
                                        ${p.shortDesc}
                                    </p>
                                </div>
                                <span class="material-symbols-outlined text-white/70 group-hover:text-white transition-colors text-2xl group-hover:translate-x-1 flex-shrink-0 ml-4">
                                    arrow_forward
                                </span>
                            </div>
                        </div>
                    </article>
                `;
            }).join('');
        }
    }
}


