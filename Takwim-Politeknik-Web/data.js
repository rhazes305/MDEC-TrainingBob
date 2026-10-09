// ── DATA DUMMY ────────────────────────────────────────────────────────────────
const DUMMY_USERS = [
  { id: 1, name: 'Admin Sistem',          email: 'admin@politeknik.edu.my', password: 'Admin@123', role: 'admin', unit_name: null },
  { id: 2, name: 'Pn. Siti Aminah',       email: 'siti@politeknik.edu.my',  password: 'Unit@123',  role: 'unit',  unit_name: 'Unit Teknologi Maklumat' },
  { id: 3, name: 'En. Razif Ismail',      email: 'razif@politeknik.edu.my', password: 'Unit@123',  role: 'unit',  unit_name: 'Unit Kewangan' },
  { id: 4, name: 'Pn. Haslinda Yusof',   email: 'haslinda@politeknik.edu.my',password:'Unit@123', role: 'unit',  unit_name: 'Unit Akademik' },
  { id: 5, name: 'En. Faizal Hamdan',    email: 'faizal@politeknik.edu.my', password: 'Unit@123',  role: 'unit',  unit_name: 'Unit HEP' },
  { id: 6, name: 'Tetamu',               email: 'guest@politeknik.edu.my',  password: 'Guest@123', role: 'guest', unit_name: null },
];

const DUMMY_EVENTS = [
  { id:1,  title:'Tahun Baru',                description:'Cuti Tahun Baru Masihi',        event_date:'2025-01-01', end_date:null,         type:'cuti' },
  { id:2,  title:'Tahun Baru Cina',           description:'Cuti Tahun Baru Cina',          event_date:'2025-01-29', end_date:'2025-01-30', type:'cuti' },
  { id:3,  title:'Mula Semester 2 2024/25',   description:'Pendaftaran & mula pengajian',  event_date:'2025-02-03', end_date:null,         type:'akademik' },
  { id:4,  title:'Minggu Orientasi',          description:'Orientasi pelajar baru',        event_date:'2025-02-03', end_date:'2025-02-07', type:'aktiviti' },
  { id:5,  title:'Hari Wilayah Persekutuan',  description:'Cuti Umum',                     event_date:'2025-02-01', end_date:null,         type:'cuti' },
  { id:6,  title:'Ujian Pertengahan Semester',description:'Ujian minggu 7',                event_date:'2025-03-17', end_date:'2025-03-21', type:'peperiksaan' },
  { id:7,  title:'Cuti Pertengahan Semester', description:'Rehat pertengahan semester',    event_date:'2025-03-22', end_date:'2025-03-30', type:'cuti' },
  { id:8,  title:'Hari Nuzul Al-Quran',       description:'Cuti Umum',                     event_date:'2025-04-18', end_date:null,         type:'cuti' },
  { id:9,  title:'Hari Pekerja',              description:'Cuti Umum',                     event_date:'2025-05-01', end_date:null,         type:'cuti' },
  { id:10, title:'Hari Wesak',                description:'Cuti Umum',                     event_date:'2025-05-12', end_date:null,         type:'cuti' },
  { id:11, title:'Minggu Ulangkaji',          description:'Minggu ulangkaji pelajar',      event_date:'2025-05-19', end_date:'2025-05-23', type:'akademik' },
  { id:12, title:'Peperiksaan Akhir Sem 2',   description:'Peperiksaan akhir semester 2',  event_date:'2025-05-26', end_date:'2025-06-06', type:'peperiksaan' },
  { id:13, title:'Hari Agong',                description:'Cuti Umum',                     event_date:'2025-06-02', end_date:null,         type:'cuti' },
  { id:14, title:'Cuti Semester',             description:'Cuti antara semester',          event_date:'2025-06-09', end_date:'2025-07-06', type:'cuti' },
  { id:15, title:'Mula Semester 1 2025/26',   description:'Pendaftaran & mula pengajian',  event_date:'2025-07-07', end_date:null,         type:'akademik' },
  { id:16, title:'Hari Raya Aidiladha',       description:'Cuti Umum',                     event_date:'2025-06-07', end_date:'2025-06-08', type:'cuti' },
  { id:17, title:'Hari Kebangsaan',           description:'Sambutan Hari Merdeka',         event_date:'2025-08-31', end_date:null,         type:'cuti' },
  { id:18, title:'Ujian Pertengahan Sem 1',   description:'Ujian minggu 7 Semester 1',     event_date:'2025-09-15', end_date:'2025-09-19', type:'peperiksaan' },
  { id:19, title:'Hari Malaysia',             description:'Cuti Umum',                     event_date:'2025-09-16', end_date:null,         type:'cuti' },
  { id:20, title:'Cuti Pertengahan Sem 1',    description:'Rehat pertengahan semester 1',  event_date:'2025-09-20', end_date:'2025-09-28', type:'cuti' },
  { id:21, title:'Deepavali',                 description:'Cuti Umum',                     event_date:'2025-10-20', end_date:null,         type:'cuti' },
  { id:22, title:'Minggu Ulangkaji Sem 1',    description:'Minggu ulangkaji pelajar',      event_date:'2025-11-17', end_date:'2025-11-21', type:'akademik' },
  { id:23, title:'Peperiksaan Akhir Sem 1',   description:'Peperiksaan akhir semester 1',  event_date:'2025-11-24', end_date:'2025-12-05', type:'peperiksaan' },
  { id:24, title:'Hari Krismas',              description:'Cuti Umum',                     event_date:'2025-12-25', end_date:null,         type:'cuti' },
  { id:25, title:'Cuti Akhir Tahun',          description:'Cuti antara semester',          event_date:'2025-12-08', end_date:'2026-01-04', type:'cuti' },
];

const DUMMY_ACTIVITIES = [
  // Unit IT - Pn. Siti (user_id: 2)
  { id:1,  user_id:2, name:'Mesyuarat Jawatankuasa IT',       purpose:'Membincangkan pelan strategik IT 2025',          achievement:'Pelan strategik diluluskan',               activity_date:'2025-07-10', status:'selesai',  justification:'Semua ahli hadir' },
  { id:2,  user_id:2, name:'Naik Taraf Pelayan',              purpose:'Meningkatkan prestasi pelayan utama',            achievement:'Pelayan dinaikkan taraf kepada 32GB RAM',   activity_date:'2025-07-15', status:'selesai',  justification:'Selesai mengikut jadual' },
  { id:3,  user_id:2, name:'Latihan Keselamatan Siber',       purpose:'Mendedahkan staf kepada ancaman siber terkini',  achievement:'45 orang staf menghadiri latihan',          activity_date:'2025-07-22', status:'selesai',  justification:'Latihan berjalan lancar' },
  { id:4,  user_id:2, name:'Audit Sistem Maklumat',           purpose:'Menyemak keselamatan sistem sedia ada',         achievement:'Laporan audit disediakan',                  activity_date:'2025-08-05', status:'selesai',  justification:'Audit lengkap tanpa isu kritikal' },
  { id:5,  user_id:2, name:'Pemasangan WiFi Blok Baru',       purpose:'Menyediakan rangkaian WiFi di blok E',          achievement:'WiFi dipasang di 12 bilik kuliah',          activity_date:'2025-08-20', status:'selesai',  justification:'Siap lebih awal dari jadual' },
  { id:6,  user_id:2, name:'Kemaskini Sistem e-Daftar',       purpose:'Memperbaiki antaramuka pendaftaran pelajar',    achievement:'Masih dalam proses pembangunan',            activity_date:'2025-09-10', status:'belum',    justification:'Tunggu kelulusan belanjawan' },
  { id:7,  user_id:2, name:'Bengkel Microsoft 365',           purpose:'Latihan penggunaan MS365 untuk staf',           achievement:'Bengkel dijadualkan Oktober 2025',          activity_date:'2025-10-08', status:'belum',    justification:'Menunggu pengesahan peserta' },
  { id:8,  user_id:2, name:'Backup Data Tahunan',             purpose:'Memastikan semua data disandarkan',             achievement:'Proses backup sedang berjalan',             activity_date:'2025-10-15', status:'belum',    justification:'Akan selesai hujung Oktober' },

  // Unit Kewangan - En. Razif (user_id: 3)
  { id:9,  user_id:3, name:'Audit Kewangan Semester 2',       purpose:'Menyemak akaun perbelanjaan semester 2',        achievement:'Audit selesai tanpa anomali',               activity_date:'2025-07-08', status:'selesai',  justification:'Semua rekod lengkap' },
  { id:10, user_id:3, name:'Penyediaan Bajet 2026',           purpose:'Menyediakan cadangan bajet tahunan',            achievement:'Draf bajet dikemukakan ke JK Kewangan',     activity_date:'2025-07-25', status:'selesai',  justification:'Diserahkan mengikut tarikh akhir' },
  { id:11, user_id:3, name:'Bengkel Pengurusan Kewangan',     purpose:'Melatih staf dalam pengurusan kewangan awam',   achievement:'20 staf mendapat sijil penyertaan',         activity_date:'2025-08-12', status:'selesai',  justification:'Pemateri dari KPM hadir' },
  { id:12, user_id:3, name:'Semakan Tuntutan Perjalanan',     purpose:'Memproses tuntutan perjalanan staf',            achievement:'128 tuntutan diproses',                     activity_date:'2025-08-28', status:'selesai',  justification:'Selesai dalam masa 3 hari' },
  { id:13, user_id:3, name:'Rekonsiliasi Akaun Bulanan',      purpose:'Mengesahkan baki akaun September',             achievement:'Rekonsiliasi lengkap',                      activity_date:'2025-09-30', status:'selesai',  justification:'Semua baki sepadan' },
  { id:14, user_id:3, name:'Laporan Kewangan Tahunan',        purpose:'Menyediakan laporan kewangan 2025',             achievement:'Masih dalam penyediaan',                    activity_date:'2025-11-30', status:'belum',    justification:'Menunggu data akhir tahun' },
  { id:15, user_id:3, name:'Perolehan Peralatan ICT',         purpose:'Membeli komputer baharu untuk makmal',          achievement:'Proses sebut harga sedang berjalan',        activity_date:'2025-10-20', status:'belum',    justification:'Menunggu keputusan tender' },

  // Unit Akademik - Pn. Haslinda (user_id: 4)
  { id:16, user_id:4, name:'Semakan Kurikulum 2025',          purpose:'Mengemas kini sukatan pelajaran',               achievement:'12 modul dikemas kini',                     activity_date:'2025-07-14', status:'selesai',  justification:'Diluluskan oleh Senat' },
  { id:17, user_id:4, name:'Mesyuarat Penyelarasan Akademik', purpose:'Menyelaras aktiviti pengajaran pensyarah',      achievement:'Jadual waktu disahkan',                     activity_date:'2025-07-21', status:'selesai',  justification:'Semua jabatan bersetuju' },
  { id:18, user_id:4, name:'Hari Kecemerlangan Pelajar',      purpose:'Mengiktiraf pencapaian pelajar cemerlang',      achievement:'180 pelajar menerima anugerah',             activity_date:'2025-08-09', status:'selesai',  justification:'Majlis berjalan lancar' },
  { id:19, user_id:4, name:'Lawatan Industri Pelajar',        purpose:'Mendedahkan pelajar kepada industri sebenar',   achievement:'2 syarikat dikunjungi, 95 pelajar hadir',   activity_date:'2025-08-25', status:'selesai',  justification:'Maklum balas pelajar sangat baik' },
  { id:20, user_id:4, name:'Kursus Pedagogi Pensyarah',       purpose:'Meningkatkan kemahiran pengajaran pensyarah',   achievement:'35 pensyarah mengikuti kursus',             activity_date:'2025-09-05', status:'selesai',  justification:'Semua pensyarah lulus penilaian' },
  { id:21, user_id:4, name:'Pembangunan Modul OBE',           purpose:'Menyediakan modul berasaskan hasil pembelajaran','achievement':'5 modul siap dibangunkan',               activity_date:'2025-10-01', status:'belum',    justification:'Dalam proses semakan pakar' },
  { id:22, user_id:4, name:'Akreditasi Program Baharu',       purpose:'Mendapatkan akreditasi MQA untuk program baru', achievement:'Dokumentasi sedang disediakan',             activity_date:'2025-11-15', status:'belum',    justification:'Menunggu borang MQA lengkap' },

  // Unit HEP - En. Faizal (user_id: 5)
  { id:23, user_id:5, name:'Minggu Destini Siswa',            purpose:'Menyambut pelajar baharu ke politeknik',        achievement:'1,200 pelajar baru mendaftar',              activity_date:'2025-07-07', status:'selesai',  justification:'Program berjalan tanpa masalah' },
  { id:24, user_id:5, name:'Sukan Antara Kolej',              purpose:'Memupuk semangat berpasukan dalam kalangan pelajar','achievement':'8 acara sukan dianjurkan',             activity_date:'2025-07-18', status:'selesai',  justification:'Penyertaan melebihi sasaran' },
  { id:25, user_id:5, name:'Program Mentor-Mentee',           purpose:'Membantu pelajar lemah akademik',               achievement:'150 pasangan mentor-mentee dibentuk',       activity_date:'2025-08-01', status:'selesai',  justification:'Pelajar menunjukkan peningkatan' },
  { id:26, user_id:5, name:'Karnival Keusahawanan',           purpose:'Menggalakkan budaya keusahawanan pelajar',      achievement:'42 gerai pelajar, hasil jualan RM15,000',   activity_date:'2025-08-16', status:'selesai',  justification:'Sambutan sangat menggalakkan' },
  { id:27, user_id:5, name:'Majlis Anugerah Dekan',           purpose:'Mengiktiraf pelajar cemerlang akademik',        achievement:'95 pelajar menerima Anugerah Dekan',        activity_date:'2025-09-20', status:'selesai',  justification:'Majlis berjalan lancar' },
  { id:28, user_id:5, name:'Program Khidmat Masyarakat',      purpose:'Memupuk semangat sukarela dalam kalangan pelajar','achievement':'Sedang dalam perancangan',              activity_date:'2025-10-25', status:'belum',    justification:'Menunggu kelulusan tempat' },
  { id:29, user_id:5, name:'Pertandingan Inovasi Pelajar',    purpose:'Mendorong kreativiti dan inovasi pelajar',      achievement:'Pendaftaran peserta dibuka',               activity_date:'2025-11-08', status:'belum',    justification:'Menunggu penaja' },
];

// ── Storage helpers ───────────────────────────────────────────────────────────
function loadStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function saveStore(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Bootstrap data ke localStorage jika belum ada ────────────────────────────
function bootstrapData() {
  if (!localStorage.getItem('tp_users'))      saveStore('tp_users',      DUMMY_USERS);
  if (!localStorage.getItem('tp_events'))     saveStore('tp_events',     DUMMY_EVENTS);
  if (!localStorage.getItem('tp_activities')) saveStore('tp_activities', DUMMY_ACTIVITIES);
  if (!localStorage.getItem('tp_seq'))        saveStore('tp_seq',        { users: DUMMY_USERS.length, events: DUMMY_EVENTS.length, activities: DUMMY_ACTIVITIES.length });
}

// ── DB API (localStorage-backed) ─────────────────────────────────────────────
const DB = {
  nextId(table) {
    const seq = loadStore('tp_seq', {});
    seq[table] = (seq[table] || 0) + 1;
    saveStore('tp_seq', seq);
    return seq[table];
  },
  users:      { all: () => loadStore('tp_users', []),      save: d => saveStore('tp_users', d) },
  events:     { all: () => loadStore('tp_events', []),     save: d => saveStore('tp_events', d) },
  activities: { all: () => loadStore('tp_activities', []), save: d => saveStore('tp_activities', d) },
};

// ── Auth helpers ──────────────────────────────────────────────────────────────
const Auth = {
  login(email, password) {
    const u = DB.users.all().find(u => u.email === email && u.password === password);
    if (!u) return null;
    sessionStorage.setItem('tp_session', JSON.stringify({ id: u.id, name: u.name, email: u.email, role: u.role, unit_name: u.unit_name }));
    return u;
  },
  current() {
    try { return JSON.parse(sessionStorage.getItem('tp_session')); } catch { return null; }
  },
  logout() {
    sessionStorage.removeItem('tp_session');
    location.href = 'index.html';
  },
  require(role) {
    const u = this.current();
    if (!u) { location.href = 'index.html'; return null; }
    if (role && u.role !== role) { location.href = 'index.html'; return null; }
    return u;
  }
};

// ── Months & Days (Malay) ─────────────────────────────────────────────────────
const MONTHS_MS = ['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'];
const DAYS_MS   = ['Ahd','Isn','Sel','Rab','Kha','Jum','Sab'];

// ── Toast ─────────────────────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = `show ${type}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = ''; }, 3000);
}

// ── Calendar renderer ─────────────────────────────────────────────────────────
function renderCalendar(containerId, year, month, events, activities, onDayClick) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.innerHTML = '';

  DAYS_MS.forEach(d => {
    const h = document.createElement('div');
    h.className = 'cal-day-hdr';
    h.textContent = d;
    wrap.appendChild(h);
  });

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today       = new Date();

  for (let i = 0; i < firstDay; i++) {
    const e = document.createElement('div');
    e.className = 'cal-cell empty';
    wrap.appendChild(e);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dow     = new Date(year, month, d).getDay();
    const cell    = document.createElement('div');
    cell.className = 'cal-cell';
    if (dow === 0 || dow === 6) cell.classList.add('weekend');
    if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear())
      cell.classList.add('today');

    const num = document.createElement('span');
    num.className = 'cal-num';
    num.textContent = d;
    cell.appendChild(num);

    // Events
    const dayEvts = (events || []).filter(ev =>
      ev.event_date === dateStr ||
      (ev.end_date && dateStr >= ev.event_date && dateStr <= ev.end_date)
    );
    dayEvts.slice(0, 2).forEach(ev => {
      const b = document.createElement('span');
      b.className = `cal-evt badge-${ev.type}`;
      b.textContent = ev.title;
      b.title = ev.title;
      cell.appendChild(b);
    });

    // Activities
    const dayActs = (activities || []).filter(a => a.activity_date === dateStr);
    dayActs.slice(0, 2).forEach(a => {
      const b = document.createElement('span');
      b.className = `cal-evt badge-${a.status}`;
      b.textContent = '✦ ' + a.name;
      b.title = a.name;
      cell.appendChild(b);
    });

    if (dayEvts.length + dayActs.length > 4) {
      const more = document.createElement('span');
      more.className = 'cal-evt';
      more.style.cssText = 'background:#f0f4f8;color:#57606a;';
      more.textContent = `+${dayEvts.length + dayActs.length - 4} lagi`;
      cell.appendChild(more);
    }

    if (onDayClick) cell.style.cursor = 'pointer';
    cell.addEventListener('click', () => onDayClick && onDayClick(dateStr, dayEvts, dayActs));
    wrap.appendChild(cell);
  }
}
