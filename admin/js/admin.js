/**
 * Technolife Group - Admin Dashboard Core JavaScript
 * Connects directly to TechnoDataStore for real-time CRUD and public site synchronization.
 */

// Toast Notifications
function showAdminToast(title, message, type = 'success') {
    let container = document.getElementById('admin-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'admin-toast-container';
        container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    const isError = type === 'error';
    
    toast.className = `p-4 rounded-xl shadow-xl border text-sm flex items-start gap-3 bg-white transition-all transform duration-300 translate-y-4 opacity-0 ${
        isSuccess ? 'border-primary/40 text-on-surface' : 
        isError ? 'border-red-500/40 text-red-900 bg-red-50' : 
        'border-gray-200 text-gray-800'
    }`;

    const icon = isSuccess ? 'check_circle' : isError ? 'error' : 'info';
    const iconColor = isSuccess ? 'text-primary' : isError ? 'text-red-600' : 'text-gray-500';

    toast.innerHTML = `
        <span class="material-symbols-outlined ${iconColor} text-xl flex-shrink-0">${icon}</span>
        <div class="flex-grow">
            <h5 class="font-bold text-sm ${isSuccess ? 'text-primary' : ''}">${title}</h5>
            <p class="text-xs text-gray-500 mt-0.5">${message}</p>
        </div>
        <button class="text-gray-400 hover:text-gray-700" onclick="this.parentElement.remove()">
            <span class="material-symbols-outlined text-base">close</span>
        </button>
    `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    });

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Modal Helpers
function openAdminModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAdminModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Convert File to Base64 (Data URL) with live preview
function setupImageUploader(fileInputId, urlInputId, previewImgId) {
    const fileInput = document.getElementById(fileInputId);
    const urlInput = document.getElementById(urlInputId);
    const previewImg = document.getElementById(previewImgId);

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                // Check file size (recommend under 3MB)
                if (file.size > 4 * 1024 * 1024) {
                    showAdminToast('File Terlalu Besar', 'Maksimal ukuran foto adalah 4MB agar performa browser optimal.', 'error');
                    return;
                }
                // In cloud mode the original file goes to Supabase Storage. Data URL is
                // only a fallback for local preview mode.
                if (window.SupabaseBridge?.ready) {
                    const label = fileInput.closest('div')?.querySelector('span');
                    const original = label?.textContent;
                    if (label) label.textContent = 'Mengunggah gambar…';
                    SupabaseBridge.uploadImage(file).then(url => {
                        if (previewImg) previewImg.src = url;
                        if (urlInput) urlInput.value = url;
                        if (label) label.textContent = 'Gambar tersimpan di cloud';
                    }).catch(error => {
                        if (label) label.textContent = original || 'Pilih Foto';
                        showAdminToast('Upload Gagal', error.message || 'Gagal mengunggah gambar.', 'error');
                    });
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target.result;
                    if (previewImg) previewImg.src = base64;
                    if (urlInput) urlInput.value = base64;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (urlInput) {
        urlInput.addEventListener('input', (e) => {
            const url = e.target.value.trim();
            if (previewImg && url) {
                previewImg.src = url;
            }
        });
    }
}

// Global Admin Setup (Sidebar, Active Link, Mobile Drawer)
document.addEventListener('DOMContentLoaded', () => {
    // Akses tulis cloud hanya untuk akun Supabase admin. Saat konfigurasi belum diisi,
    // dashboard tetap dapat dipreview secara lokal.
    requireCloudAdminLogin();
    // Mobile sidebar toggle
    const toggleBtn = document.getElementById('adminSidebarToggle');
    const sidebar = document.getElementById('adminSidebar');
    const backdrop = document.getElementById('adminSidebarBackdrop');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
            if (backdrop) backdrop.classList.toggle('hidden');
        });
    }

    if (backdrop && sidebar) {
        backdrop.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            backdrop.classList.add('hidden');
        });
    }

    // Close modals on backdrop or ESC
    document.querySelectorAll('.admin-modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.admin-modal-overlay.active').forEach(m => {
                m.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
});

async function requireCloudAdminLogin() {
    if (!window.SupabaseBridge?.ready) return;
    const current = await SupabaseBridge.session();
    if (current) return;
    const layer = document.createElement('div');
    layer.id = 'supabaseAdminLogin';
    layer.className = 'fixed inset-0 z-[100] bg-admin-dark/95 backdrop-blur-sm flex items-center justify-center p-4';
    layer.innerHTML = `
        <form class="w-full max-w-sm bg-white rounded-2xl p-7 shadow-2xl space-y-4">
            <div><p class="text-primary font-bold text-xs uppercase tracking-wider">Technolife Admin</p><h1 class="font-heading text-xl font-bold mt-1">Masuk untuk mengelola website</h1><p class="text-xs text-gray-500 mt-2">Gunakan akun admin yang dibuat di Supabase Authentication.</p></div>
            <label class="block text-xs font-bold text-gray-700">Email<input required type="email" name="email" class="mt-1.5 w-full rounded-xl border border-gray-200 p-3 text-sm" placeholder="admin@technolife.com"></label>
            <label class="block text-xs font-bold text-gray-700">Password<input required type="password" name="password" class="mt-1.5 w-full rounded-xl border border-gray-200 p-3 text-sm"></label>
            <p data-login-error class="hidden text-xs text-red-600"></p>
            <button class="w-full rounded-xl bg-primary text-white font-bold text-sm py-3">Masuk ke Dashboard</button>
        </form>`;
    document.body.appendChild(layer);
    layer.querySelector('form').addEventListener('submit', async event => {
        event.preventDefault();
        const form = event.currentTarget, error = form.querySelector('[data-login-error]');
        const button = form.querySelector('button'); button.disabled = true; button.textContent = 'Memeriksa akun…';
        try {
            await SupabaseBridge.signIn(form.email.value, form.password.value);
            layer.remove(); showAdminToast('Login berhasil', 'Perubahan akan dipublikasikan ke website.', 'success');
        } catch (e) {
            error.textContent = e.message || 'Email atau password tidak valid.'; error.classList.remove('hidden');
            button.disabled = false; button.textContent = 'Masuk ke Dashboard';
        }
    });
}

/* ==========================================================================
   1. DASHBOARD OVERVIEW (index.html)
   ========================================================================== */
function initDashboardPage() {
    if (!window.TechnoDataStore) return;
    const store = TechnoDataStore.getAll();

    // KPIs
    const kpiFacilities = document.getElementById('kpiFacilities');
    const kpiFnb = document.getElementById('kpiFnb');
    const kpiPortfolio = document.getElementById('kpiPortfolio');
    const kpiBookings = document.getElementById('kpiBookings');
    const kpiInquiries = document.getElementById('kpiInquiries');
    const kpiCareers = document.getElementById('kpiCareers');

    if (kpiFacilities) kpiFacilities.textContent = store.facilities.length;
    if (kpiFnb) kpiFnb.textContent = store.fnb.length;
    if (kpiPortfolio) kpiPortfolio.textContent = store.portfolio.length;
    if (kpiBookings) kpiBookings.textContent = store.bookings.length;
    if (kpiInquiries) kpiInquiries.textContent = store.inquiries.length;
    if (kpiCareers) kpiCareers.textContent = store.careers.length;

    // Recent Bookings Table
    const recentBookingsTbody = document.getElementById('recentBookingsTbody');
    if (recentBookingsTbody) {
        const recent = store.bookings.slice(0, 5);
        if (recent.length === 0) {
            recentBookingsTbody.innerHTML = '<tr><td colspan="5" class="py-6 text-center text-gray-400 text-xs">Belum ada booking masuk.</td></tr>';
        } else {
            recentBookingsTbody.innerHTML = recent.map(b => `
                <tr class="border-b border-gray-100 hover:bg-gray-50/70">
                    <td class="py-3 px-4">
                        <div class="font-semibold text-xs text-gray-900">${b.customerName}</div>
                        <div class="text-[11px] text-gray-400">${b.customerPhone}</div>
                    </td>
                    <td class="py-3 px-4 text-xs font-medium text-primary">${b.serviceName}</td>
                    <td class="py-3 px-4 text-xs text-gray-600">${b.date} <span class="text-gray-400">(${b.time || '-'})</span></td>
                    <td class="py-3 px-4">
                        <span class="badge-status ${
                            b.status === 'Confirmed' ? 'badge-confirmed' :
                            b.status === 'Completed' ? 'badge-completed' : 'badge-pending'
                        }">${b.status}</span>
                    </td>
                    <td class="py-3 px-4 text-right">
                        <a href="bookings.html" class="text-xs text-primary font-semibold hover:underline">Kelola &rarr;</a>
                    </td>
                </tr>
            `).join('');
        }
    }

    // Recent Inquiries Table
    const recentInquiriesTbody = document.getElementById('recentInquiriesTbody');
    if (recentInquiriesTbody) {
        const recent = store.inquiries.slice(0, 5);
        if (recent.length === 0) {
            recentInquiriesTbody.innerHTML = '<tr><td colspan="4" class="py-6 text-center text-gray-400 text-xs">Belum ada pesan masuk.</td></tr>';
        } else {
            recentInquiriesTbody.innerHTML = recent.map(i => `
                <tr class="border-b border-gray-100 hover:bg-gray-50/70">
                    <td class="py-3 px-4">
                        <div class="font-semibold text-xs text-gray-900">${i.name}</div>
                        <div class="text-[11px] text-gray-400">${i.email}</div>
                    </td>
                    <td class="py-3 px-4">
                        <span class="text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                            i.type === 'Partnership' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }">${i.type}</span>
                    </td>
                    <td class="py-3 px-4 text-xs text-gray-600 truncate max-w-xs">${i.subject || i.message}</td>
                    <td class="py-3 px-4 text-right">
                        <a href="bookings.html#inquiries" class="text-xs text-primary font-semibold hover:underline">Lihat &rarr;</a>
                    </td>
                </tr>
            `).join('');
        }
    }
}

/* ==========================================================================
   2. FACILITIES MANAGEMENT (facilities.html)
   ========================================================================== */
function initFacilitiesPage() {
    setupImageUploader('facilityFileInput', 'facilityImageUrl', 'facilityImagePreview');
    renderFacilitiesList();

    const form = document.getElementById('facilityEditForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('facilityEditId').value;
            const updated = {
                name: document.getElementById('facilityName').value.trim(),
                badge: document.getElementById('facilityBadge').value.trim(),
                specs: document.getElementById('facilitySpecs').value.trim(),
                price: document.getElementById('facilityPrice').value.trim(),
                description: document.getElementById('facilityDesc').value.trim(),
                image: document.getElementById('facilityImageUrl').value.trim(),
                active: document.getElementById('facilityActive').checked
            };

            TechnoDataStore.updateFacility(id, updated);
            closeAdminModal('facilityModal');
            showAdminToast('Fasilitas Diperbarui!', `Data & foto fasilitas "${updated.name}" berhasil diupdate.`, 'success');
            renderFacilitiesList();
        });
    }
}

function renderFacilitiesList() {
    const grid = document.getElementById('facilitiesGrid');
    if (!grid) return;
    const facilities = TechnoDataStore.getFacilities();

    grid.innerHTML = facilities.map((f, index) => `
        <div class="admin-card overflow-hidden flex flex-col justify-between group">
            <div class="relative h-48 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center p-3 border-b border-gray-100">
                <img src="${f.image}" alt="" class="absolute inset-0 w-full h-full object-cover blur-xl opacity-20 scale-125 select-none pointer-events-none"/>
                <img src="${f.image}" alt="${f.name}" class="relative z-10 max-h-full max-w-full w-auto h-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"/>
                <div class="absolute top-3 left-3 z-20">
                    <span class="bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-primary shadow-sm">
                        ${f.badge}
                    </span>
                </div>
                <div class="absolute top-3 right-3 z-20">
                    <span class="badge-status ${f.active ? 'badge-confirmed' : 'badge-cancelled'}">
                        ${f.active ? 'Aktif' : 'Non-Aktif'}
                    </span>
                </div>
            </div>
            <div class="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-1.5">
                        <h4 class="font-bold text-base text-gray-900">${f.name}</h4>
                        <span class="text-[11px] text-gray-400">#${index + 1}</span>
                    </div>
                    <p class="text-xs text-gray-500 line-clamp-2 mb-3">${f.description}</p>
                    <div class="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-gray-50 border border-gray-100">
                        <span class="text-gray-500 font-medium">${f.specs || 'Standard'}</span>
                        <span class="font-bold text-primary">${f.price || '-'}</span>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <a href="../service-detail.html?id=${f.id}" target="_blank" class="text-xs text-gray-400 hover:text-primary flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">visibility</span> Cek di Web
                    </a>
                    <button type="button" onclick="openEditFacilityModal('${f.id}')" class="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-red-800 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-all">
                        <span class="material-symbols-outlined text-sm">edit</span> Edit Foto & Info
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openEditFacilityModal(id) {
    const f = TechnoDataStore.getFacilityById(id);
    if (!f) return;

    document.getElementById('facilityEditId').value = f.id;
    document.getElementById('facilityName').value = f.name;
    document.getElementById('facilityBadge').value = f.badge;
    document.getElementById('facilitySpecs').value = f.specs || '';
    document.getElementById('facilityPrice').value = f.price || '';
    document.getElementById('facilityDesc').value = f.description;
    document.getElementById('facilityImageUrl').value = f.image;
    document.getElementById('facilityImagePreview').src = f.image;
    document.getElementById('facilityActive').checked = f.active !== false;

    openAdminModal('facilityModal');
}

/* ==========================================================================
   3. FOOD & BEVERAGE MANAGEMENT (fnb.html)
   ========================================================================== */
function initFnbPage() {
    setupImageUploader('fnbFileInput', 'fnbImageUrl', 'fnbImagePreview');
    renderFnbList();

    const form = document.getElementById('fnbEditForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('fnbEditId').value;
            const updated = {
                name: document.getElementById('fnbName').value.trim(),
                badge: document.getElementById('fnbBadge').value.trim(),
                hours: document.getElementById('fnbHours').value.trim(),
                priceRange: document.getElementById('fnbPriceRange').value.trim(),
                description: document.getElementById('fnbDesc').value.trim(),
                image: document.getElementById('fnbImageUrl').value.trim(),
                active: document.getElementById('fnbActive').checked
            };

            TechnoDataStore.updateFnb(id, updated);
            closeAdminModal('fnbModal');
            showAdminToast('F&B Diperbarui!', `Data outlet "${updated.name}" berhasil disimpan.`, 'success');
            renderFnbList();
        });
    }
}

function renderFnbList() {
    const grid = document.getElementById('fnbGrid');
    if (!grid) return;
    const items = TechnoDataStore.getFnb();

    grid.innerHTML = items.map((f, index) => `
        <div class="admin-card overflow-hidden flex flex-col justify-between group">
            <div class="relative h-48 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center p-3 border-b border-gray-100">
                <img src="${f.image}" alt="" class="absolute inset-0 w-full h-full object-cover blur-xl opacity-20 scale-125 select-none pointer-events-none"/>
                <img src="${f.image}" alt="${f.name}" class="relative z-10 max-h-full max-w-full w-auto h-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"/>
                <div class="absolute top-3 left-3 z-20">
                    <span class="bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-primary shadow-sm">
                        ${f.badge}
                    </span>
                </div>
                <div class="absolute top-3 right-3 z-20">
                    <span class="badge-status ${f.active ? 'badge-confirmed' : 'badge-cancelled'}">
                        ${f.active ? 'Buka' : 'Tutup'}
                    </span>
                </div>
            </div>
            <div class="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-1.5">
                        <h4 class="font-bold text-base text-gray-900">${f.name}</h4>
                        <span class="text-[11px] text-gray-400">#${index + 1}</span>
                    </div>
                    <p class="text-xs text-gray-500 line-clamp-2 mb-3">${f.description}</p>
                    <div class="space-y-1.5 text-xs py-2 px-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-400 flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">schedule</span> Jam</span>
                            <span class="text-gray-700 font-medium">${f.hours || '-'}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-400 flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">payments</span> Harga</span>
                            <span class="font-bold text-primary">${f.priceRange || '-'}</span>
                        </div>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <a href="../service-detail.html?id=${f.id}" target="_blank" class="text-xs text-gray-400 hover:text-primary flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">visibility</span> Cek di Web
                    </a>
                    <button type="button" onclick="openEditFnbModal('${f.id}')" class="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-red-800 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-all">
                        <span class="material-symbols-outlined text-sm">edit</span> Edit Foto & Menu
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openEditFnbModal(id) {
    const f = TechnoDataStore.getFnbById(id);
    if (!f) return;

    document.getElementById('fnbEditId').value = f.id;
    document.getElementById('fnbName').value = f.name;
    document.getElementById('fnbBadge').value = f.badge;
    document.getElementById('fnbHours').value = f.hours || '';
    document.getElementById('fnbPriceRange').value = f.priceRange || '';
    document.getElementById('fnbDesc').value = f.description;
    document.getElementById('fnbImageUrl').value = f.image;
    document.getElementById('fnbImagePreview').src = f.image;
    document.getElementById('fnbActive').checked = f.active !== false;

    openAdminModal('fnbModal');
}

/* ==========================================================================
   4. PORTFOLIO PROJECTS MANAGEMENT (portfolio.html)
   ========================================================================== */
function initPortfolioPage() {
    setupImageUploader('portfolioFileInput', 'portfolioImageUrl', 'portfolioImagePreview');
    renderPortfolioTable();

    const form = document.getElementById('portfolioForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('portfolioId').value;
            const projectData = {
                title: document.getElementById('portfolioTitle').value.trim(),
                category: document.getElementById('portfolioCategory').value,
                badge: document.getElementById('portfolioBadge').value.trim(),
                shortDesc: document.getElementById('portfolioShortDesc').value.trim(),
                fullDesc: document.getElementById('portfolioFullDesc').value.trim(),
                image: document.getElementById('portfolioImageUrl').value.trim(),
                colSpan: parseInt(document.getElementById('portfolioColSpan').value) || 4,
                featured: document.getElementById('portfolioFeatured').checked
            };

            if (id) {
                TechnoDataStore.updatePortfolio(id, projectData);
                showAdminToast('Proyek Diperbarui', `Proyek "${projectData.title}" berhasil diupdate.`, 'success');
            } else {
                TechnoDataStore.addPortfolio(projectData);
                showAdminToast('Proyek Ditambahkan', `Proyek baru "${projectData.title}" berhasil dipublikasikan.`, 'success');
            }

            closeAdminModal('portfolioModal');
            renderPortfolioTable();
        });
    }
}

function renderPortfolioTable() {
    const tbody = document.getElementById('portfolioTbody');
    if (!tbody) return;
    const items = TechnoDataStore.getPortfolio();

    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-400 text-xs">Belum ada portofolio proyek. Klik tombol tambah proyek.</td></tr>';
        return;
    }

    tbody.innerHTML = items.map((p, idx) => `
        <tr class="border-b border-gray-100 hover:bg-gray-50/70">
            <td class="py-3 px-4 text-xs font-semibold text-gray-400">#${idx + 1}</td>
            <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                    <img src="${p.image}" alt="${p.title}" class="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"/>
                    <div>
                        <div class="font-bold text-xs text-gray-900">${p.title}</div>
                        <div class="text-[11px] text-gray-400 line-clamp-1 max-w-xs">${p.shortDesc}</div>
                    </div>
                </div>
            </td>
            <td class="py-3 px-4">
                <span class="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-700 capitalize">
                    ${p.category}
                </span>
            </td>
            <td class="py-3 px-4 text-xs font-medium text-gray-600">Grid ${p.colSpan}/12</td>
            <td class="py-3 px-4">
                ${p.featured ? '<span class="badge-status badge-confirmed">Featured</span>' : '<span class="text-xs text-gray-400">Standard</span>'}
            </td>
            <td class="py-3 px-4 text-right space-x-2">
                <button type="button" onclick="editPortfolioItem('${p.id}')" class="p-1.5 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg">
                    <span class="material-symbols-outlined text-base">edit</span>
                </button>
                <button type="button" onclick="deletePortfolioItem('${p.id}', '${p.title}')" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <span class="material-symbols-outlined text-base">delete</span>
                </button>
            </td>
        </tr>
    `).join('');
}

function openAddPortfolioModal() {
    document.getElementById('portfolioForm').reset();
    document.getElementById('portfolioId').value = '';
    document.getElementById('portfolioModalTitle').textContent = 'Tambah Proyek Portofolio';
    document.getElementById('portfolioImagePreview').src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&fit=crop';
    document.getElementById('portfolioImageUrl').value = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&fit=crop';
    openAdminModal('portfolioModal');
}

function editPortfolioItem(id) {
    const p = TechnoDataStore.getPortfolio().find(item => item.id === id);
    if (!p) return;

    document.getElementById('portfolioId').value = p.id;
    document.getElementById('portfolioTitle').value = p.title;
    document.getElementById('portfolioCategory').value = p.category;
    document.getElementById('portfolioBadge').value = p.badge || '';
    document.getElementById('portfolioShortDesc').value = p.shortDesc;
    document.getElementById('portfolioFullDesc').value = p.fullDesc;
    document.getElementById('portfolioImageUrl').value = p.image;
    document.getElementById('portfolioImagePreview').src = p.image;
    document.getElementById('portfolioColSpan').value = p.colSpan || 4;
    document.getElementById('portfolioFeatured').checked = !!p.featured;
    document.getElementById('portfolioModalTitle').textContent = 'Edit Proyek Portofolio';

    openAdminModal('portfolioModal');
}

function deletePortfolioItem(id, title) {
    if (confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) {
        TechnoDataStore.deletePortfolio(id);
        showAdminToast('Proyek Dihapus', `Proyek "${title}" telah dihapus dari portofolio.`, 'info');
        renderPortfolioTable();
    }
}

/* ==========================================================================
   5. BOOKINGS & INQUIRIES HUB (bookings.html)
   ========================================================================== */
function initBookingsPage() {
    renderBookingsHub();

    // Status filter buttons
    document.querySelectorAll('[data-filter-status]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-filter-status]').forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
            btn.classList.add('active', 'bg-primary', 'text-white');
            const status = btn.getAttribute('data-filter-status');
            renderBookingsHub(status);
        });
    });
}

function renderBookingsHub(filterStatus = 'all') {
    const tbodyBookings = document.getElementById('allBookingsTbody');
    const tbodyInquiries = document.getElementById('allInquiriesTbody');
    const store = TechnoDataStore.getAll();

    // 1. Render Bookings
    if (tbodyBookings) {
        let bookings = store.bookings;
        if (filterStatus !== 'all') {
            bookings = bookings.filter(b => b.status.toLowerCase() === filterStatus.toLowerCase());
        }

        if (bookings.length === 0) {
            tbodyBookings.innerHTML = '<tr><td colspan="7" class="py-8 text-center text-gray-400 text-xs">Tidak ada data reservasi.</td></tr>';
        } else {
            tbodyBookings.innerHTML = bookings.map(b => `
                <tr class="border-b border-gray-100 hover:bg-gray-50/70">
                    <td class="py-3 px-4 text-xs font-semibold text-gray-500">${b.id}</td>
                    <td class="py-3 px-4">
                        <div class="font-bold text-xs text-gray-900">${b.customerName}</div>
                        <div class="text-[11px] text-gray-400">${b.customerEmail} | ${b.customerPhone}</div>
                    </td>
                    <td class="py-3 px-4 text-xs font-semibold text-primary">${b.serviceName}</td>
                    <td class="py-3 px-4 text-xs text-gray-600">
                        <div>${b.date}</div>
                        <div class="text-[11px] text-gray-400">${b.time || '-'} (${b.pax || '1'} Pax)</div>
                    </td>
                    <td class="py-3 px-4 text-xs text-gray-500 max-w-xs truncate" title="${b.notes || '-'}">
                        ${b.notes || '-'}
                    </td>
                    <td class="py-3 px-4">
                        <select onchange="changeBookingStatus('${b.id}', this.value)" class="text-xs rounded-lg border-gray-200 py-1 px-2 font-semibold ${
                            b.status === 'Confirmed' ? 'text-green-700 bg-green-50' :
                            b.status === 'Completed' ? 'text-gray-700 bg-gray-50' :
                            b.status === 'Cancelled' ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50'
                        }">
                            <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                            <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
                            <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </td>
                    <td class="py-3 px-4 text-right">
                        <button onclick="deleteBookingRow('${b.id}')" class="p-1.5 text-gray-400 hover:text-red-600 rounded-lg" title="Hapus">
                            <span class="material-symbols-outlined text-base">delete</span>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    // 2. Render Inquiries
    if (tbodyInquiries) {
        const inquiries = store.inquiries;
        if (inquiries.length === 0) {
            tbodyInquiries.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-400 text-xs">Tidak ada pesan masuk.</td></tr>';
        } else {
            tbodyInquiries.innerHTML = inquiries.map(i => `
                <tr class="border-b border-gray-100 hover:bg-gray-50/70">
                    <td class="py-3 px-4 text-xs font-semibold text-gray-400">${i.createdAt || '-'}</td>
                    <td class="py-3 px-4">
                        <div class="font-bold text-xs text-gray-900">${i.name}</div>
                        <div class="text-[11px] text-gray-400">${i.email} | ${i.phone}</div>
                    </td>
                    <td class="py-3 px-4">
                        <span class="text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                            i.type === 'Partnership' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }">${i.type}</span>
                    </td>
                    <td class="py-3 px-4 text-xs font-medium text-gray-800">${i.subject || '-'}</td>
                    <td class="py-3 px-4 text-xs text-gray-600 max-w-sm">${i.message}</td>
                    <td class="py-3 px-4 text-right">
                        <button onclick="deleteInquiryRow('${i.id}')" class="p-1.5 text-gray-400 hover:text-red-600 rounded-lg" title="Hapus">
                            <span class="material-symbols-outlined text-base">delete</span>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

function changeBookingStatus(id, newStatus) {
    TechnoDataStore.updateBookingStatus(id, newStatus);
    showAdminToast('Status Berubah', `Status reservasi #${id} diubah menjadi "${newStatus}".`, 'success');
}

function deleteBookingRow(id) {
    if (confirm(`Hapus reservasi #${id}?`)) {
        TechnoDataStore.deleteBooking(id);
        showAdminToast('Reservasi Dihapus', `Data reservasi #${id} telah dihapus.`, 'info');
        renderBookingsHub();
    }
}

function deleteInquiryRow(id) {
    if (confirm(`Hapus pesan inquiry #${id}?`)) {
        TechnoDataStore.deleteInquiry(id);
        showAdminToast('Pesan Dihapus', `Pesan inquiry #${id} telah dihapus.`, 'info');
        renderBookingsHub();
    }
}

/* ==========================================================================
   6. CAREERS & APPLICANTS MANAGEMENT (careers.html)
   ========================================================================== */
function initCareersPage() {
    renderCareersTable();
    renderApplicantsTable();

    const form = document.getElementById('careerForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('careerId').value;
            const jobData = {
                title: document.getElementById('careerTitle').value.trim(),
                dept: document.getElementById('careerDept').value.trim(),
                location: document.getElementById('careerLocation').value.trim(),
                type: document.getElementById('careerType').value,
                deadline: document.getElementById('careerDeadline').value.trim(),
                desc: document.getElementById('careerDesc').value.trim(),
                status: document.getElementById('careerStatus').value
            };

            if (id) {
                TechnoDataStore.updateCareer(id, jobData);
                showAdminToast('Lowongan Diupdate', `Posisi "${jobData.title}" berhasil diubah.`, 'success');
            } else {
                TechnoDataStore.addCareer(jobData);
                showAdminToast('Lowongan Ditambahkan', `Posisi baru "${jobData.title}" dibuka.`, 'success');
            }

            closeAdminModal('careerModal');
            renderCareersTable();
        });
    }
}

function renderCareersTable() {
    const tbody = document.getElementById('careersTbody');
    if (!tbody) return;
    const careers = TechnoDataStore.getCareers();

    tbody.innerHTML = careers.map((j, idx) => `
        <tr class="border-b border-gray-100 hover:bg-gray-50/70">
            <td class="py-3 px-4 text-xs font-semibold text-gray-400">#${idx + 1}</td>
            <td class="py-3 px-4">
                <div class="font-bold text-xs text-gray-900">${j.title}</div>
                <div class="text-[11px] text-gray-400">${j.dept}</div>
            </td>
            <td class="py-3 px-4 text-xs text-gray-600">${j.location}</td>
            <td class="py-3 px-4 text-xs text-gray-600">${j.type}</td>
            <td class="py-3 px-4 text-xs text-gray-600">${j.deadline}</td>
            <td class="py-3 px-4">
                <span class="badge-status ${j.status === 'Active' ? 'badge-confirmed' : 'badge-cancelled'}">${j.status}</span>
            </td>
            <td class="py-3 px-4 text-right space-x-1">
                <button onclick="editCareerJob('${j.id}')" class="p-1.5 text-gray-600 hover:text-primary rounded-lg">
                    <span class="material-symbols-outlined text-base">edit</span>
                </button>
                <button onclick="deleteCareerJob('${j.id}', '${j.title}')" class="p-1.5 text-gray-400 hover:text-red-600 rounded-lg">
                    <span class="material-symbols-outlined text-base">delete</span>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderApplicantsTable() {
    const tbody = document.getElementById('applicantsTbody');
    if (!tbody) return;
    const applicants = TechnoDataStore.getApplicants();

    if (applicants.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="py-6 text-center text-gray-400 text-xs">Belum ada pelamar pekerjaan masuk.</td></tr>';
        return;
    }

    tbody.innerHTML = applicants.map(a => `
        <tr class="border-b border-gray-100 hover:bg-gray-50/70">
            <td class="py-3 px-4">
                <div class="font-bold text-xs text-gray-900">${a.name}</div>
                <div class="text-[11px] text-gray-400">${a.email} | ${a.phone}</div>
            </td>
            <td class="py-3 px-4 text-xs font-semibold text-primary">${a.jobTitle || 'General Application'}</td>
            <td class="py-3 px-4 text-xs text-gray-600">${a.experience || '-'}</td>
            <td class="py-3 px-4 text-xs">
                ${a.portfolioUrl ? `<a href="${a.portfolioUrl}" target="_blank" class="text-primary hover:underline flex items-center gap-1">Link Resume <span class="material-symbols-outlined text-sm">open_in_new</span></a>` : '-'}
            </td>
            <td class="py-3 px-4">
                <select onchange="changeApplicantStatus('${a.id}', this.value)" class="text-xs rounded-lg border-gray-200 py-1 px-2 font-semibold">
                    <option value="New" ${a.status === 'New' ? 'selected' : ''}>New</option>
                    <option value="Review" ${a.status === 'Review' ? 'selected' : ''}>Under Review</option>
                    <option value="Interview" ${a.status === 'Interview' ? 'selected' : ''}>Interview</option>
                    <option value="Accepted" ${a.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
                    <option value="Rejected" ${a.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                </select>
            </td>
            <td class="py-3 px-4 text-xs text-gray-400 text-right">${a.appliedAt || '-'}</td>
        </tr>
    `).join('');
}

function openAddCareerModal() {
    document.getElementById('careerForm').reset();
    document.getElementById('careerId').value = '';
    document.getElementById('careerModalTitle').textContent = 'Buka Lowongan Kerja Baru';
    openAdminModal('careerModal');
}

function editCareerJob(id) {
    const j = TechnoDataStore.getCareers().find(item => item.id === id);
    if (!j) return;

    document.getElementById('careerId').value = j.id;
    document.getElementById('careerTitle').value = j.title;
    document.getElementById('careerDept').value = j.dept;
    document.getElementById('careerLocation').value = j.location;
    document.getElementById('careerType').value = j.type;
    document.getElementById('careerDeadline').value = j.deadline;
    document.getElementById('careerDesc').value = j.desc;
    document.getElementById('careerStatus').value = j.status;
    document.getElementById('careerModalTitle').textContent = 'Edit Lowongan Kerja';

    openAdminModal('careerModal');
}

function deleteCareerJob(id, title) {
    if (confirm(`Hapus lowongan kerja "${title}"?`)) {
        TechnoDataStore.deleteCareer(id);
        showAdminToast('Lowongan Dihapus', `Lowongan "${title}" telah ditutup.`, 'info');
        renderCareersTable();
    }
}

function changeApplicantStatus(id, status) {
    TechnoDataStore.updateApplicantStatus(id, status);
    showAdminToast('Status Pelamar Diupdate', `Status pelamar diubah menjadi "${status}".`, 'success');
}

/* ==========================================================================
   7. SETTINGS & BACKUP (settings.html)
   ========================================================================== */
function initSettingsPage() {
    const settings = TechnoDataStore.getSettings();

    // Populate fields
    if (document.getElementById('settingCompanyName')) {
        document.getElementById('settingCompanyName').value = settings.companyName || '';
        document.getElementById('settingTagline').value = settings.tagline || '';
        document.getElementById('settingPhone').value = settings.phone || '';
        document.getElementById('settingWhatsapp').value = settings.whatsapp || '';
        document.getElementById('settingEmail').value = settings.email || '';
        document.getElementById('settingAddress').value = settings.address || '';
        document.getElementById('settingHours').value = settings.workingHours || '';
    }

    const form = document.getElementById('settingsForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const updated = {
                companyName: document.getElementById('settingCompanyName').value.trim(),
                tagline: document.getElementById('settingTagline').value.trim(),
                phone: document.getElementById('settingPhone').value.trim(),
                whatsapp: document.getElementById('settingWhatsapp').value.trim(),
                email: document.getElementById('settingEmail').value.trim(),
                address: document.getElementById('settingAddress').value.trim(),
                workingHours: document.getElementById('settingHours').value.trim()
            };
            TechnoDataStore.updateSettings(updated);
            showAdminToast('Pengaturan Disimpan', 'Informasi perusahaan dan kontak website berhasil diperbarui.', 'success');
        });
    }

    // Export Backup
    const exportBtn = document.getElementById('btnExportBackup');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            TechnoDataStore.exportJSON();
            showAdminToast('Backup Terunduh', 'File JSON cadangan database berhasil diekspor.', 'success');
        });
    }

    // Import Backup
    const importInput = document.getElementById('backupFileInput');
    if (importInput) {
        importInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const res = TechnoDataStore.importJSON(event.target.result);
                    if (res.success) {
                        showAdminToast('Import Berhasil!', 'Data website telah dipulihkan dari file backup.', 'success');
                        setTimeout(() => location.reload(), 1200);
                    } else {
                        showAdminToast('Gagal Import', res.error, 'error');
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    // Reset Defaults
    const resetBtn = document.getElementById('btnResetDefaults');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('PERINGATAN: Seluruh data foto, fasilitas, dan teks yang Anda ubah akan kembali ke data bawaan pabrik awal. Lanjutkan?')) {
                TechnoDataStore.resetToDefault();
                showAdminToast('Reset Sukses', 'Semua data telah dikembalikan ke bawaan awal.', 'info');
                setTimeout(() => location.reload(), 1200);
            }
        });
    }
}

