const express = require('express');
const { db, nextId } = require('../db');
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

// GET /api/activities
router.get('/', (req, res) => {
  const allUsers = db.get('users').value();
  let acts;

  if (req.user.role === 'admin') {
    acts = db.get('activities').value();
  } else {
    acts = db.get('activities').filter({ user_id: req.user.id }).value();
  }

  const result = acts.map(a => {
    const u = allUsers.find(u => u.id === a.user_id) || {};
    return { ...a, user_name: u.name || '—', unit_name: u.unit_name || null };
  }).sort((a,b) => b.activity_date.localeCompare(a.activity_date));

  res.json(result);
});

// POST /api/activities
router.post('/', requireRole('unit'), (req, res) => {
  const { name, purpose, achievement, activity_date, status, justification } = req.body;
  if (!name || !activity_date)
    return res.status(400).json({ error: 'Nama aktiviti dan tarikh diperlukan' });

  const id  = nextId('activities');
  const now = new Date().toISOString();

  const act = {
    id, user_id: req.user.id, name,
    purpose: purpose || null, achievement: achievement || null,
    activity_date, status: status || 'belum',
    justification: justification || null,
    created_at: now, updated_at: now
  };

  db.get('activities').push(act).write();
  res.status(201).json({ id, message: 'Aktiviti berjaya ditambah' });
});

// PUT /api/activities/:id
router.put('/:id', requireRole('unit','admin'), (req, res) => {
  const aid = parseInt(req.params.id);
  const act = db.get('activities').find({ id: aid }).value();
  if (!act) return res.status(404).json({ error: 'Aktiviti tidak dijumpai' });

  if (req.user.role === 'unit' && act.user_id !== req.user.id)
    return res.status(403).json({ error: 'Akses tidak dibenarkan' });

  const { name, purpose, achievement, activity_date, status, justification } = req.body;
  const update = {
    name:          name          ?? act.name,
    purpose:       purpose       !== undefined ? purpose       : act.purpose,
    achievement:   achievement   !== undefined ? achievement   : act.achievement,
    activity_date: activity_date ?? act.activity_date,
    status:        status        ?? act.status,
    justification: justification !== undefined ? justification : act.justification,
    updated_at:    new Date().toISOString(),
  };

  db.get('activities').find({ id: aid }).assign(update).write();
  res.json({ message: 'Aktiviti berjaya dikemaskini' });
});

// DELETE /api/activities/:id
router.delete('/:id', requireRole('unit','admin'), (req, res) => {
  const aid = parseInt(req.params.id);
  const act = db.get('activities').find({ id: aid }).value();
  if (!act) return res.status(404).json({ error: 'Aktiviti tidak dijumpai' });

  if (req.user.role === 'unit' && act.user_id !== req.user.id)
    return res.status(403).json({ error: 'Akses tidak dibenarkan' });

  db.get('activities').remove({ id: aid }).write();
  res.json({ message: 'Aktiviti berjaya dipadam' });
});

module.exports = router;
