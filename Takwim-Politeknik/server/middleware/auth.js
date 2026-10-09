const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'takwim-politeknik-secret-2025';

function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'Token diperlukan' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Format token tidak sah' });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token tidak sah atau tamat tempoh' });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Akses tidak dibenarkan' });
    }
    next();
  };
}

module.exports = { authMiddleware, requireRole, SECRET };
