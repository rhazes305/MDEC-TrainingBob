const low    = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bcrypt = require('bcryptjs');
const path   = require('path');
const fs     = require('fs');
const shortid = require('shortid');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const adapter = new FileSync(path.join(dataDir, 'db.json'));
const db = low(adapter);

// ── Schema defaults ──────────────────────────────────────────────────────────
db.defaults({ users: [], activities: [], events: [], _seq: { users: 0, activities: 0, events: 0 } }).write();

// ── Helper: auto-increment IDs ────────────────────────────────────────────────
function nextId(table) {
  const seq = db.get(`_seq.${table}`).value() + 1;
  db.set(`_seq.${table}`, seq).write();
  return seq;
}

// ── Seed ──────────────────────────────────────────────────────────────────────
function initDb() {
  const admins = db.get('users').filter({ role: 'admin' }).value();
  if (admins.length > 0) return;

  const hash = p => bcrypt.hashSync(p, 10);
  const now = new Date().toISOString();

  const adminId = nextId('users');
  const unitId  = nextId('users');
  const guestId = nextId('users');

  db.get('users').push(
    { id: adminId, name: 'Admin Sistem',    email: 'admin@politeknik.edu.my', password: hash('Admin@123'), role: 'admin', unit_name: null,                           created_at: now },
    { id: unitId,  name: 'Pegawai Unit IT', email: 'unit@politeknik.edu.my',  password: hash('Unit@123'),  role: 'unit',  unit_name: 'Unit Teknologi Maklumat',       created_at: now },
    { id: guestId, name: 'Tetamu',          email: 'guest@politeknik.edu.my', password: hash('Guest@123'), role: 'guest', unit_name: null,                           created_at: now }
  ).write();

  const evts = [
    { title: 'Tahun Baru',               description: 'Cuti Tahun Baru',             event_date: '2025-01-01', end_date: null,         type: 'cuti' },
    { title: 'Tahun Baru Cina',          description: 'Cuti Tahun Baru Cina',        event_date: '2025-01-29', end_date: '2025-01-30', type: 'cuti' },
    { title: 'Mula Semester 2 2024/25',  description: 'Mula pengajian Semester 2',   event_date: '2025-03-31', end_date: null,         type: 'akademik' },
    { title: 'Hari Pekerja',             description: 'Cuti Umum',                   event_date: '2025-05-01', end_date: null,         type: 'cuti' },
    { title: 'Akhir Semester 2 2024/25', description: 'Tamat pengajian Semester 2',  event_date: '2025-06-02', end_date: null,         type: 'akademik' },
    { title: 'Mula Semester 1 2025/26',  description: 'Mula pengajian Semester 1',   event_date: '2025-07-07', end_date: null,         type: 'akademik' },
    { title: 'Hari Merdeka',             description: 'Hari Kemerdekaan Malaysia',   event_date: '2025-08-31', end_date: null,         type: 'cuti' },
    { title: 'Hari Malaysia',            description: 'Hari Malaysia',               event_date: '2025-09-16', end_date: null,         type: 'cuti' },
    { title: 'Peperiksaan Akhir Sem 1',  description: 'Peperiksaan akhir semester',  event_date: '2025-10-20', end_date: '2025-10-31', type: 'peperiksaan' },
    { title: 'Deepavali',                description: 'Cuti Deepavali',              event_date: '2025-11-01', end_date: null,         type: 'cuti' },
    { title: 'Akhir Semester 1 2025/26', description: 'Tamat pengajian Semester 1',  event_date: '2025-12-01', end_date: null,         type: 'akademik' },
    { title: 'Hari Krismas',             description: 'Cuti Krismas',                event_date: '2025-12-25', end_date: null,         type: 'cuti' },
  ];
  evts.forEach(e => {
    db.get('events').push({ id: nextId('events'), ...e, created_by: adminId, created_at: now }).write();
  });

  console.log('✅ Data asal (seed) telah dibuat.');
}

module.exports = { db, nextId, initDb };
