const express = require('express');
const bcrypt  = require('bcryptjs');
const { db, nextId } = require('../db');
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

// GET /api/users
router.get('/', requireRole('admin'), (req, res) => {
  const users = db.get('users').map(u => ({
    id: u.id, name: u.name, email: u.email,
    role: u.role, unit_name: u.unit_name, created_at: u.created_at
  })).value().sort((a,b) => b.created_at.localeCompare(a.created_at));
  res.json(users);
});

// POST /api/users
router.post('/', requireRole('admin'), (req, res) => {
  const { name, email, password, role, unit_name } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ error: 'Nama, email, kata laluan dan peranan diperlukan' });

  const exists = db.get('users').find({ email }).value();
  if (exists) return res.status(409).json({ error: 'Email sudah digunakan' });

  const id = nextId('users');
  const hashed = bcrypt.hashSync(password, 10);
  const now = new Date().toISOString();

  db.get('users').push({ id, name, email, password: hashed, role, unit_name: unit_name || null, created_at: now }).write();
  res.status(201).json({ id, name, email, role, unit_name: unit_name || null });
});

// PUT /api/users/:id
router.put('/:id', requireRole('admin'), (req, res) => {
  const uid = parseInt(req.params.id);
  const user = db.get('users').find({ id: uid }).value();
  if (!user) return res.status(404).json({ error: 'Pengguna tidak dijumpai' });

  const { name, email, role, unit_name, password } = req.body;
  const update = {
    name:      name      || user.name,
    email:     email     || user.email,
    role:      role      || user.role,
    unit_name: unit_name !== undefined ? unit_name : user.unit_name,
  };
  if (password) update.password = bcrypt.hashSync(password, 10);

  db.get('users').find({ id: uid }).assign(update).write();
  res.json({ message: 'Pengguna berjaya dikemaskini' });
});

// DELETE /api/users/:id
router.delete('/:id', requireRole('admin'), (req, res) => {
  const uid = parseInt(req.params.id);
  if (uid === req.user.id)
    return res.status(400).json({ error: 'Tidak boleh padam akaun sendiri' });

  const user = db.get('users').find({ id: uid }).value();
  if (!user) return res.status(404).json({ error: 'Pengguna tidak dijumpai' });

  db.get('users').remove({ id: uid }).write();
  db.get('activities').remove({ user_id: uid }).write();
  res.json({ message: 'Pengguna berjaya dipadam' });
});

// GET /api/users/report/summary
router.get('/report/summary', requireRole('admin'), (req, res) => {
  const unitUsers = db.get('users').filter({ role: 'unit' }).value();
  const allActs   = db.get('activities').value();

  const result = unitUsers.map(u => {
    const acts    = allActs.filter(a => a.user_id === u.id);
    const selesai = acts.filter(a => a.status === 'selesai').length;
    const belum   = acts.filter(a => a.status === 'belum').length;
    const total   = acts.length;
    return {
      id: u.id, name: u.name, unit_name: u.unit_name,
      total, selesai, belum,
      peratus_selesai: total > 0 ? Math.round((selesai / total) * 100) : 0
    };
  }).sort((a,b) => (a.unit_name||'').localeCompare(b.unit_name||''));

  res.json(result);
});

module.exports = router;
