// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta GET: Obtener todos los productos
app.get('/api/productos', (req, res) => {
    try {
        const stmt = db.prepare("SELECT * FROM productos");
        const rows = stmt.all();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Backend corriendo en http://localhost:${PORT}`);
    console.log(`📦 Datos disponibles en http://localhost:${PORT}/api/productos`);
});