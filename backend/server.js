const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "bookstore_db",
  port: Number(process.env.DB_PORT || 3306),
});

db.connect((err) => {
  if (err) {
    console.error(" DB connection error:", err.message);
  } else {
    console.log(" Connected to MySQL");
  }
});


app.get("/", (req, res) => {
  res.json({ message: "Bookstore API is running" });
});


app.get("/api/books", (req, res) => {
  db.query(
    "SELECT id, title, author, price, image FROM books ORDER BY id",
    (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(rows);
    }
  );
});

// SIGNUP
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    db.query("SELECT id FROM users WHERE email = ?", [email], async (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      if (rows.length > 0)
        return res.status(409).json({ message: "Email already exists" });

      const password_hash = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [name, email, password_hash],
        (err2, result) => {
          if (err2) return res.status(500).json({ message: err2.message });
          res.status(201).json({ id: result.insertId, name, email });
        }
      );
    });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

// LOGIN
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  db.query(
    "SELECT id, email, password_hash FROM users WHERE email = ?",
    [email],
    async (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      if (rows.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = rows[0];
      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.json({ token });
    }
  );
});

// Start
const PORT = process.env.PORT || 5000;
const booksData = [
  { id: 1, title: "Qui Ment?", author: "Karen M. McManus", price: 13.99, image: "https://cdn.club.be/product/9782092575222/front-medium-94184267.jpg" },
  { id: 2, title: "C’est arrivé la nuit", author: "Marc Levy", price: 21.90, image: "https://cdn.club.be/product/9782221243572/front-medium-2104526053.jpg" },
  { id: 3, title: "Caraval", author: "Stéphanie Garber", price: 10.99, image: "https://cdn.club.be/product/9782017043584/front-medium-3914200763.jpg" },
  { id: 4, title: "La vie est un roman", author: "Guillaume Musso", price: 9.99, image: "https://cdn.club.be/product/9782380200454/front-medium-1958553488.jpg" },
  { id: 5, title: "Famille parfaite", author: "Lisa Gardner", price: 11.99, image: "https://cdn.club.be/product/9782253237082/front-medium-2998117479.jpg" }
];

app.get("/api/books", (req, res) => {
  res.json(booksData);
});

app.listen(PORT, () => console.log("API running on port " + PORT));

//pour github 
const cors = require("cors");
app.use(cors({ origin: "*" }));


