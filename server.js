require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;  // Usando la variable de entorno PORT

// Configurar CORS
app.use(cors());
app.use(express.json()); // Para recibir datos en formato JSON

const db = mysql.createConnection({
    host: process.env.DB_HOST,     // Usando la variable de entorno DB_HOST
    user: process.env.DB_USER,     // Usando la variable de entorno DB_USER
    password: process.env.DB_PASSWORD, // Usando la variable de entorno DB_PASSWORD
    database: process.env.DB_NAME, // Usando la variable de entorno DB_NAME
    port: process.env.DB_PORT  
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a MySQL:', err);
        return;
    }
    console.log('📦 Conectado a MySQL ✅');
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('🚀 Servidor funcionando correctamente');
});

// Ruta para Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: '⚠️ Todos los campos son obligatorios' });
    }

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: '❌ Error en el servidor', error: err });
        }
        if (result.length > 0) {
            res.json({ message: '✅ Login exitoso', user: result[0] });
        } else {
            res.status(401).json({ message: '❌ Credenciales incorrectas' });
        }
    });
});

// Ruta para Registro
app.post('/registro', (req, res) => {
    const { email, password, nombre, apellido, direccion, telefono } = req.body;
    
    if (!email || !password || !nombre || !apellido || !direccion || !telefono) {
        return res.status(400).json({ message: '⚠️ Todos los campos son obligatorios' });
    }

    const sql = 'INSERT INTO usuarios (email, password, nombre, apellido, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [email, password, nombre, apellido, direccion, telefono], (err, result) => {
        if (err) {
            return res.status(500).json({ message: '❌ Error en el servidor', error: err });
        }
        res.json({ message: '✅ Registro exitoso' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`🔥 Servidor corriendo en http://localhost:${port}`);
});
