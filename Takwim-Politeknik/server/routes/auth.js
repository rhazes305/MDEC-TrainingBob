const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const { db }  = require('../db');
const { SECRET, authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email dan kata laluan diperlukan' });

  const user = db.get('users').find({ email }).value();
  if (!user) return res.status(401).json({ error: 'Email atau kata laluan salah' });

  if (!bcrypt.compareSync(password, user.password))
    return res.status(401).json({ error: 'Email atau kata laluan salah' });

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role, unit_name: user.unit_name },
    SECRET, { expiresIn: '8h' }
  );

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, unit_name: user.unit_name } });
});

// POST /api/auth/change-password
router.post('/change-password', authMiddleware, (req, res) => {
  const { current_password, new_password } = req.body;
  if (!current_password || !new_password)
    return res.status(400).json({ error: 'Semua medan diperlukan' });

  const user = db.get('users').find({ id: req.user.id }).value();
  if (!bcrypt.compareSync(current_password, user.password))
    return res.status(400).json({ error: 'Kata laluan semasa tidak betul' });

  db.get('users').find({ id: req.user.id }).assign({ password: bcrypt.hashSync(new_password, 10) }).write();
  res.json({ message: 'Kata laluan berjaya ditukar' });
});

module.exports = router;
