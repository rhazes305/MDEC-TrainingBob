// ── Data Cuti Umum & Akademik Politeknik (contoh) ──────────────────────────
const defaultEvents = [
  { date: "2025-01-01", name: "Tahun Baru", type: "cuti" },
  { date: "2025-01-29", name: "Tahun Baru Cina", type: "cuti" },
  { date: "2025-02-01", name: "Wilayah Persekutuan", type: "cuti" },
  { date: "2025-03-31", name: "Mula Semester 2 2024/2025", type: "akademik" },
  { date: "2025-04-18", name: "Hari Nuzul Al-Quran", type: "cuti" },
  { date: "2025-05-01", name: "Hari Pekerja", type: "cuti" },
  { date: "2025-05-12", name: "Hari Wesak", type: "cuti" },
  { date: "2025-06-02", name: "Akhir Semester 2 2024/2025", type: "akademik" },
  { date: "2025-06-02", name: "Hari Agong", type: "cuti" },
  { date: "2025-07-07", name: "Mula Semester 1 2025/2026", type: "akademik" },
  { date: "2025-08-31", name: "Hari Merdeka", type: "cuti" },
  { date: "2025-09-16", name: "Hari Malaysia", type: "cuti" },
  { date: "2025-10-20", name: "Peperiksaan Akhir Semester 1", type: "peperiksaan" },
  { date: "2025-11-01", name: "Deepavali", type: "cuti" },
  { date: "2025-12-01", name: "Akhir Semester 1 2025/2026", type: "akademik" },
  { date: "2025-12-25", name: "Hari Krismas", type: "cuti" },
];

// ── State ──────────────────────────────────────────────────────────────────
const today = new Date();
let currentYear  = today.getFullYear();
let currentMonth = today.getMonth(); // 0-based

const MONTHS_MS = [
  "Januari","Februari","Mac","April","Mei","Jun",
  "Julai","Ogos","September","Oktober","November","Disember"
];

// Load events from localStorage atau guna default
function loadEvents() {
  const stored = localStorage.getItem("takwimEvents");
  return stored ? JSON.parse(stored) : [...defaultEvents];
}

function saveEvents(events) {
  localStorage.setItem("takwimEvents", JSON.stringify(events));
}

let events = loadEvents();

// ── Render Kalendar ────────────────────────────────────────────────────────
function renderCalendar() {
  document.getElementById("monthYear").textContent =
    `${MONTHS_MS[currentMonth]} ${currentYear}`;

  const container = document.getElementById("calendarDays");
  container.innerHTML = "";

  const firstDay  = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Sel kosong sebelum hari pertama
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "day-cell empty";
    container.appendChild(empty);
  }

  // Hari-hari dalam bulan
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    const dateStr = formatDate(currentYear, currentMonth + 1, d);
    const dow = new Date(currentYear, currentMonth, d).getDay();

    cell.className = "day-cell";
    if (dow === 0) cell.classList.add("sunday");
    if (dow === 6) cell.classList.add("saturday");

    const isToday =
      d === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear  === today.getFullYear();
    if (isToday) cell.classList.add("today");

    // Nombor hari
    const num = document.createElement("div");
    num.className = "day-number";
    num.textContent = d;
    cell.appendChild(num);

    // Badge acara
    const dayEvents = events.filter(e => e.date === dateStr);
    dayEvents.forEach(ev => {
      const badge = document.createElement("div");
      badge.className = `event-badge badge-${ev.type}`;
      badge.textContent = ev.name;
      cell.appendChild(badge);
    });

    container.appendChild(cell);
  }

  renderEventList();
}

// ── Render Senarai Acara (bulan semasa) ────────────────────────────────────
function renderEventList() {
  const list = document.getElementById("eventList");
  list.innerHTML = "";

  const monthStr = `${currentYear}-${String(currentMonth + 1).padStart(2,"0")}`;
  const monthEvents = events
    .filter(e => e.date.startsWith(monthStr))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (monthEvents.length === 0) {
    list.innerHTML = "<p style='color:#57606a;font-size:0.88rem;'>Tiada acara untuk bulan ini.</p>";
    return;
  }

  monthEvents.forEach((ev, idx) => {
    const item = document.createElement("div");
    item.className = `event-item badge-${ev.type}`;

    const info = document.createElement("span");
    info.className = "event-info";

    const datePart = document.createElement("span");
    datePart.className = "event-date";
    datePart.textContent = formatDisplayDate(ev.date);

    info.appendChild(datePart);
    info.appendChild(document.createTextNode(ev.name));

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "✕";
    removeBtn.title = "Padam acara";
    removeBtn.addEventListener("click", () => {
      const globalIdx = events.indexOf(ev);
      if (globalIdx > -1) {
        events.splice(globalIdx, 1);
        saveEvents(events);
        renderCalendar();
      }
    });

    item.appendChild(info);
    item.appendChild(removeBtn);
    list.appendChild(item);
  });
}

// ── Tambah Acara ────────────────────────────────────────────────────────────
document.getElementById("addEventBtn").addEventListener("click", () => {
  const dateVal = document.getElementById("eventDate").value;
  const nameVal = document.getElementById("eventName").value.trim();
  const typeVal = document.getElementById("eventType").value;

  if (!dateVal || !nameVal) {
    alert("Sila isi tarikh dan nama acara.");
    return;
  }

  events.push({ date: dateVal, name: nameVal, type: typeVal });
  saveEvents(events);

  // Tukar ke bulan acara yang ditambah
  const [y, m] = dateVal.split("-").map(Number);
  currentYear  = y;
  currentMonth = m - 1;

  document.getElementById("eventDate").value = "";
  document.getElementById("eventName").value = "";

  renderCalendar();
});

// ── Navigasi Bulan ──────────────────────────────────────────────────────────
document.getElementById("prevMonth").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  renderCalendar();
});

// ── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(y, m, d) {
  return `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}

function formatDisplayDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${d} ${MONTHS_MS[parseInt(m,10)-1]} ${y} — `;
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.getElementById("year").textContent = today.getFullYear();
renderCalendar();
