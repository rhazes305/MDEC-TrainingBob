const express = require('express');
const { db, nextId } = require('../db');
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/events
router.get('/', authMiddleware, (req, res) => {
  const allUsers = db.get('users').value();
  const events = db.get('events').value()
    .map(e => {
      const u = allUsers.find(u => u.id === e.created_by);
      return { ...e, created_by_name: u ? u.name : null };
    })
    .sort((a,b) => a.event_date.localeCompare(b.event_date));
  res.json(events);
});

// POST /api/events
router.post('/', authMiddleware, requireRole('admin'), (req, res) => {
  const { title, description, event_date, end_date, type } = req.body;
  if (!title || !event_date)
    return res.status(400).json({ error: 'Tajuk dan tarikh acara diperlukan' });

  const id  = nextId('events');
  const now = new Date().toISOString();

  db.get('events').push({
    id, title, description: description || null,
    event_date, end_date: end_date || null,
    type: type || 'aktiviti', created_by: req.user.id, created_at: now
  }).write();

  res.status(201).json({ id, message: 'Acara berjaya ditambah' });
});

// PUT /api/events/:id
router.put('/:id', authMiddleware, requireRole('admin'), (req, res) => {
  const eid = parseInt(req.params.id);
  const ev  = db.get('events').find({ id: eid }).value();
  if (!ev) return res.status(404).json({ error: 'Acara tidak dijumpai' });

  const { title, description, event_date, end_date, type } = req.body;
  db.get('events').find({ id: eid }).assign({
    title:       title       ?? ev.title,
    description: description !== undefined ? description : ev.description,
    event_date:  event_date  ?? ev.event_date,
    end_date:    end_date    !== undefined ? end_date    : ev.end_date,
    type:        type        ?? ev.type,
  }).write();

  res.json({ message: 'Acara berjaya dikemaskini' });
});

// DELETE /api/events/:id
router.delete('/:id', authMiddleware, requireRole('admin'), (req, res) => {
  const eid = parseInt(req.params.id);
  const ev  = db.get('events').find({ id: eid }).value();
  if (!ev) return res.status(404).json({ error: 'Acara tidak dijumpai' });

  db.get('events').remove({ id: eid }).write();
  res.json({ message: 'Acara berjaya dipadam' });
});

module.exports = router;
