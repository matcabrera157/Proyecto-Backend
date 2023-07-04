const { Router } = require ("express");
const router = new Router();
const mysql = require ('mysql');
require('dotenv').config();

// Conexión a base de datos


const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
    
    conn.connect((err) => {
        if (err) throw err;
        console.log('Conexión Establecida...')
    });
    
    
    //RUTAS
    // SELECT 
    router.get('/productos', (req, res) => {
        let sql = "SELECT * FROM producto";
        let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('productos', {
            results: results
        });
        });
    });
    
    // Insertar 
    router.post('/save', (req, res) => {
        let data = { producto_nombre: req.body.producto_nombre, producto_precio: req.body.producto_precio, producto_descripcion: req.body.producto_descripcion, producto_imagen: req.body.producto_imagen, };
        let sql = "INSERT INTO producto SET ?";
        let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/productos');
        });
    });
    
    
    //UPDATE
    router.post('/update', (req, res) => {
        let sql = "UPDATE producto SET producto_nombre='" + req.body.producto_nombre + "', producto_precio='" + req.body.producto_precio +  "', producto_descripcion='" + req.body.producto_descripcion + "', producto_imagen='" + req.body.producto_imagen  + "' WHERE producto_id=" + req.body.id;
        let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/productos');
        });
    });
    
    // DELETE
    router.post('/delete',(req, res) => {
        let sql = "DELETE FROM producto WHERE producto_id="+req.body.producto_id+"";
        let query = conn.query(sql, (err, results) => {
        if(err) throw err;
            res.redirect('/productos');
        });
    });
    
    module.exports = router;