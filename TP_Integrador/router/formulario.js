const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();


router.get('/formulario',(req, res) => {
    res.render("formulario")
});

router.post('/enviar', async(req, res) =>{
    const { nombre, email, mensaje } = req.body;


// Validar campos
if (!nombre || !email || !mensaje){
    return res.render('formulario', { error: 'Todos los campos son obligatorios' });
}


// Configuro transportador SMTP

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'keon.muller@ethereal.email',
        pass: 'Fv6jp97DjC2FtPes3W'
    }
});

// Configuro correo electrónico
const mailOptions = {
    from: email,
    to: 'matcabrera@frba.utn.edu.ar',
    subject: 'Formulario de contacto',
    text: `
    Nombre: ${nombre}\n
    Email:${email}\n 
    Mensaje:${mensaje}`
};



try{
    //Enviar correo electrónico
    await transporter.sendMail(mailOptions);
    res.render('confirmacion',{
        nombre: req.body.nombre
    });
} catch (error){
    console.log(error);
    res.render('formulario', { error: 'Error al enviar mensaje'});
}


})
module.exports = router;