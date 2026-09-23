(() => {
    const widget = document.getElementById('eventCalendarWidget');
    if (!widget) return;

    const monthLabel = widget.querySelector('[data-calendar-month]');
    const daysContainer = widget.querySelector('[data-calendar-days]');
    const statusLabel = widget.querySelector('[data-calendar-status]');
    const previousButton = widget.querySelector('[data-calendar-prev]');
    const nextButton = widget.querySelector('[data-calendar-next]');
    const apiUrl = widget.dataset.calendarApi;
    const calendarUrl = widget.dataset.calendarUrl;
    let currentMonth = new Date();
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);

    const pad = value => String(value).padStart(2, '0');
    const dateKey = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`;

    function render(busyDates = new Set()) {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const dayCount = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        monthLabel.textContent = currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
        daysContainer.innerHTML = '';

        for (let empty = 0; empty < firstDay; empty += 1) {
            daysContainer.insertAdjacentHTML('beforeend', '<span aria-hidden="true" class="aspect-square"></span>');
        }

        for (let day = 1; day <= dayCount; day += 1) {
            const key = dateKey(year, month, day);
            const isBusy = busyDates.has(key);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const stateClass = isBusy ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
            const stateText = isBusy ? 'Terisi acara' : 'Tersedia untuk booking';

            daysContainer.insertAdjacentHTML('beforeend', `
                <a href="${calendarUrl}" title="${key}: ${stateText}" aria-label="${key}: ${stateText}" class="aspect-square min-h-10 rounded-xl border ${stateClass} ${isToday ? 'ring-2 ring-primary ring-offset-1' : ''} flex flex-col items-center justify-center text-xs font-bold hover:scale-105 transition-transform">
                    <span>${day}</span>
                    <span class="w-1.5 h-1.5 rounded-full ${isBusy ? 'bg-red-500' : 'bg-emerald-500'} mt-1"></span>
                </a>
            `);
        }
    }

    async function loadCalendar() {
        const month = `${currentMonth.getFullYear()}-${pad(currentMonth.getMonth() + 1)}`;
        statusLabel.textContent = 'Memuat ketersediaan tanggal...';
        try {
            const response = await fetch(`${apiUrl}?month=${month}`);
            if (!response.ok) throw new Error('Calendar service unavailable');
            const data = await response.json();
            const busyDates = new Set(data.busy_dates || []);
            render(busyDates);
            statusLabel.textContent = `${busyDates.size} tanggal terisi pada bulan ini. Klik tanggal untuk membuka sistem kalender.`;
        } catch (error) {
            render();
            statusLabel.innerHTML = 'Status langsung belum tersedia. <a class="text-primary underline font-semibold" href="' + calendarUrl + '">Buka Event Calendar</a> untuk melihat jadwal terbaru.';
        }
    }

    previousButton.addEventListener('click', () => {
        currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        loadCalendar();
    });
    nextButton.addEventListener('click', () => {
        currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
        loadCalendar();
    });

    loadCalendar();
})();
