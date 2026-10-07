// backend/database.js
const { DatabaseSync } = require('node:sqlite');

// Crea (o se conecta a) un archivo físico llamado tienda.db
const db = new DatabaseSync('./tienda.db');
console.log('✅ Conectado a la base de datos SQLite Nativa de Node.js (tienda.db)');

// Crear la tabla si no existe
db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        categoria TEXT NOT NULL,
        precio REAL NOT NULL,
        stock INTEGER NOT NULL,
        imagen TEXT,
        descripcion TEXT
    )
`);

// Comprobar si ya hay datos
const checkStmt = db.prepare("SELECT COUNT(*) AS count FROM productos");
const row = checkStmt.get();

if (row.count === 0) {
    console.log("Inyectando datos semilla en SQLite...");
    const insert = db.prepare(`INSERT INTO productos (nombre, categoria, precio, stock, imagen, descripcion) VALUES (?, ?, ?, ?, ?, ?)`);
    
    insert.run("Monitor Gamer 27 IPS 144Hz", "Accesorios", 159990, 10, "/resources/Monitor.png", "Monitor de 27 pulgadas con panel IPS diseñado para juegos competitivos.");
    insert.run("Lenovo ThinkPad T14", "Computadoras", 649990, 15, "/resources/LenovoThinkPad.png", "Potente laptop para trabajo duro.");
}

module.exports = db;