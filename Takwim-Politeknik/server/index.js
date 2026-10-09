const express = require('express');
const cors    = require('cors');
const path    = require('path');
const { initDb } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Routes
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/users',      require('./routes/users'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/events',     require('./routes/events'));

// Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

initDb();

app.listen(PORT, () => {
  console.log(`\n🚀 Takwim Politeknik berjalan di http://localhost:${PORT}`);
  console.log(`   Akaun default:`);
  console.log(`   Admin : admin@politeknik.edu.my  / Admin@123`);
  console.log(`   Unit  : unit@politeknik.edu.my   / Unit@123`);
  console.log(`   Guest : guest@politeknik.edu.my  / Guest@123\n`);
});
