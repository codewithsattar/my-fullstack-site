const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Setup SQLite DB
const db = new sqlite3.Database('./database.db');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)");
});

// API Routes
app.get('/api/users', (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
