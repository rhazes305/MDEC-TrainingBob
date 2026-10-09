// ===== SHARED DATA STORE (localStorage) =====
const KPI_DATA_KEY = 'kpi_data';
const KPI_ACHIEVEMENTS_KEY = 'kpi_achievements';

function getKPIs() {
  const raw = localStorage.getItem(KPI_DATA_KEY);
  if (raw) return JSON.parse(raw);
  // Default sample KPIs
  const defaults = [
    { id: 1, name: 'Latihan Dalaman', category: 'Pembangunan SDM', target: 10, unit: 'sesi', weightage: 20, sasaran: 'OD Unit A', status: 'Aktif' },
    { id: 2, name: 'Kepuasan Pelanggan', category: 'Kualiti Perkhidmatan', target: 85, unit: '%', weightage: 25, sasaran: 'OD Unit B', status: 'Aktif' },
    { id: 3, name: 'Kehadiran Program', category: 'Pengurusan Program', target: 90, unit: '%', weightage: 15, sasaran: 'OD Unit A', status: 'Aktif' },
    { id: 4, name: 'Bilangan Modul Baharu', category: 'Pembangunan Kandungan', target: 5, unit: 'modul', weightage: 20, sasaran: 'OD Unit C', status: 'Aktif' },
    { id: 5, name: 'Penilaian Prestasi', category: 'HR', target: 100, unit: '%', weightage: 20, sasaran: 'OD Unit B', status: 'Aktif' },
  ];
  localStorage.setItem(KPI_DATA_KEY, JSON.stringify(defaults));
  return defaults;
}

function saveKPIs(data) {
  localStorage.setItem(KPI_DATA_KEY, JSON.stringify(data));
}

function getAchievements() {
  const raw = localStorage.getItem(KPI_ACHIEVEMENTS_KEY);
  if (raw) return JSON.parse(raw);
  const defaults = [
    { id: 1, kpiId: 1, pencapaian: 7, catatan: 'Sesi bulan Jan-Apr', dokumen: 'laporan_latihan.pdf', tarikh: '2025-04-30', status: 'Dikemukakan' },
    { id: 2, kpiId: 2, pencapaian: 88, catatan: 'Survei Q1', dokumen: 'survei_q1.pdf', tarikh: '2025-04-30', status: 'Disahkan' },
    { id: 3, kpiId: 3, pencapaian: 76, catatan: 'Jan-Mac', dokumen: 'rekod_hadir.pdf', tarikh: '2025-04-30', status: 'Dikemukakan' },
    { id: 4, kpiId: 4, pencapaian: 2, catatan: 'Modul Q1', dokumen: '', tarikh: '2025-04-30', status: 'Draf' },
    { id: 5, kpiId: 5, pencapaian: 95, catatan: 'Penilaian Tahunan', dokumen: 'penilaian.pdf', tarikh: '2025-04-30', status: 'Disahkan' },
  ];
  localStorage.setItem(KPI_ACHIEVEMENTS_KEY, JSON.stringify(defaults));
  return defaults;
}

function saveAchievements(data) {
  localStorage.setItem(KPI_ACHIEVEMENTS_KEY, JSON.stringify(data));
}

function getPct(achieved, target) {
  if (!target) return 0;
  return Math.min(Math.round((achieved / target) * 100), 100);
}

function getPctColor(pct) {
  if (pct >= 85) return 'green';
  if (pct >= 60) return 'orange';
  return 'red';
}

function getPctBadge(pct) {
  if (pct >= 85) return '<span class="badge green">Baik</span>';
  if (pct >= 60) return '<span class="badge orange">Sederhana</span>';
  return '<span class="badge red">Rendah</span>';
}

function logout() {
  localStorage.removeItem('kpi_role');
  localStorage.removeItem('kpi_user');
  window.location.href = 'index.html';
}

function checkAuth(expectedRole) {
  const role = localStorage.getItem('kpi_role');
  if (!role || (expectedRole && role !== expectedRole)) {
    window.location.href = 'index.html';
  }
  return role;
}

function getUser() {
  return localStorage.getItem('kpi_user') || '—';
}
