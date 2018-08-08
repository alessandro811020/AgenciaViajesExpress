const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Travel = require('../models/Travel');
const Contacto = require("../models/Contacto");
const Reserva = require("../models/Reserva");
const CONN = require('../connection/mysqlconn');
const email = require('../config/emailConf');
const bcrypt = require('bcrypt');


router.get('/home', async (req,res,next)=>{
    let noEncontrado =false
    req.session.destroy()
    try{
        const ofertas = await Travel.findAll();        
        res.render('home',{
            title:"Agencia de Viajes de GEEKSHUBS",
            consulta: ofertas,
            noEncontrado: noEncontrado
        });
    }catch(err){
        console.log('Ha habido un error');
        res.render('error',{
            title:"Agencia de Viajes de GEEKSHUBS",
            status:404
        });
    }
})

router.post('/accesoReservas', async (req,res,next)=>{

    try{       
        const usuarioBuscado = await Reserva.findAll({
            where:{
                usuario: req.body.usuarioEntrar,
            }
        })
        const chequeoPassword = bcrypt.compareSync(req.body.passwordEntrar, usuarioBuscado[0].password);

        if (chequeoPassword) {
            
            req.session.usuario=usuarioBuscado[0].usuario;
            req.session.nombre= usuarioBuscado[0].nombre;
            req.session.apellidos = usuarioBuscado[0].apellidos;
            req.session.email = usuarioBuscado[0].email;

            res.render('ofertasReservadas', {
                title: "Agencia de Viajes de GEEKSHUBS -- Reservas de "+usuarioBuscado[0].nombre,
                titulo_formulario: "Reservas realizadas por "+usuarioBuscado[0].nombre +" "+usuarioBuscado[0].apellidos,
                nombre: req.session.nombre,
                apellidos: req.session.apellidos,
                identificacion: usuarioBuscado[0].identificacion,
                email: req.session.email,
                usuario: req.session.usuario,
                telefono: usuarioBuscado[0].telefono,
                ciudad: usuarioBuscado[0].ciudad,
                precio: usuarioBuscado[0].precio,
                caracteristica: 'readonly',
                reserva: usuarioBuscado[0].reserva
            });
        } else {
            console.log('no logueo bien');
            noEncontrado= true;
            const ofertas = await Travel.findAll();        
            res.render('home',{
                title:"Agencia de Viajes de GEEKSHUBS",
                consulta: ofertas,
                noEncontrado:true//hay que preparar para que salga el cartel referente a error de login
            });
        }
    }catch(err){
        console.log('Ha habido un error');
        res.render('error',{
            title:"Agencia de Viajes de GEEKSHUBS",
            status:404
        });
    }
});

router.get('/quienes', async (req, res, next)=>{
    try{
        res.render('somos', {
            title: "Agencia de Viajes de GEEKSHUBS -- Quienes Somos"
        });
    }catch(err){
        console.log('Ha habido un error', err);
        res.render('error',{
            title:"Agencia de Viajes de GEEKSHUBS",
            status:404
        });
    }
})

router.get('/ubicacion', async (req,res,next)=>{
    const pantalla= 'allowfullscreen';
    try{       
        res.render('mapaAgencia',{
            title:"Agencia de Viajes de GEEKSHUBS -- Mapa",
            localizacion: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12317.800936526715!2d-0.35594!3d39.481747!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5aae0e0b7fa0358a!2sGeeksHubs+Space+Valencia!5e0!3m2!1ses!2ses!4v1533332146648",
            width:600,
            height:450,
            frameborder:0,
            style:"border:0",
            pantalla,
            direccion: "Calle Vicente Barrera Cambra nº 6, (esquina Guardia Civil), 46020 Valencia"
        });
    }catch(err){
        console.log('Ha habido un error', err);
        res.render('error',{
            title:"Agencia de Viajes de GEEKSHUBS",
            status:404
        });
    }
});

router.get('/contacto', async (req,res,next)=>{
    try{       
        res.render('contacto',{
            title:"Agencia de Viajes de GEEKSHUBS -- Contacto",
            titulo_formulario:'Formulario de Contacto'
        });
    }catch(err){
        console.log('Ha habido un error');
        res.render('error',{
            title:"Agencia de Viajes de GEEKSHUBS",
            status:404
        });
    }
});

router.get('/viaje/:lugar', async (req,res,next)=>{
    try{       
        const oferta = await Travel.findAll({
            where:{
                paraid: req.params.lugar
            }
        })
        console.log(oferta[0].ciudad);
        
        res.render('reserva',{
            title:"Agencia de Viajes de GEEKSHUBS -- Reservar en "+req.params.lugar,
            ciudad: oferta[0].ciudad,
            precio: oferta[0].precio,
            reserva: oferta[0].reserva,
            caracteristica: 'readonly',
            requerido: 'required',
            titulo_formulario:'Formulario de Reserva'
        });
    }catch(err){
        console.log('Ha habido un error');
        res.render('error',{
            title:"Agencia de Viajes de GEEKSHUBS",
            status:404
        });
    }
});


router.post('/contactarAgencia', async (req, res, next)=>{
    try{   
        Contacto.create({
            nombre: req.body.nombre,
            email: req.body.email,
            topico: req.body.topico,
            consulta: req.body.consulta
        }).then(()=>{

            const textoCorreo="Se ha presentado una nueva inquietud. Datos del solicitante\nNombre:"+req.body.nombre+"\nEmail:"+req.body.email+"\nTopico:"+req.body.topico+"\nConsulta:"+req.body.consulta;
            const cartaConsulta1={
                to: 'enquirygeekshubstravels@gmail.com',
                subject: req.body.topico,
                html: textoCorreo,
            }
            const cartaConsulta2={
                to: req.body.email,
                subject: "Confirmación de recepción de la consulta "+req.body.topico,
                html: "Usted ha realizado a la agencia textoCorreo la consulta: "+textoCorreo
            }
            email.transporter.sendMail(cartaConsulta1,(error, info)=>{
                if(error) {
                    res.status(500).send(error,cartaConsulta1);
                    return ;
                }else{
                    res.status(200).send('Respuesta "%s"'+info.response);
                }
            })

            email.transporter.sendMail(cartaConsulta2,(error, info)=>{
                if(error) {
                    res.status(500).send(error,cartaConsulta2);
                    return ;
                }else{
                    email.transporter.close();
                    res.status(200).send('Respuesta "%s"'+info.response);
                }
            })

            res.render('contactarAgencia',{
                title:"Agencia de Viajes de GEEKSHUBS -- Recibido",
                mensaje:'Estimado '+req.body.nombre+' su inquietud ha sido enviado satisfactoriamente, pronto nos pondremos en contacto con usted. Muchas gracias'
            });    
        })
        
    }catch(err){
        console.log('Ha habido un error');
        res.render('error',{
            title:"Agencia de Viajes de GEEKSHUBS",
            status:404
        });
    }
})

router.post('/reservarOferta', async (req, res, next)=>{
    const saltRounds= 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    try{   
        Reserva.create({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            usuario: req.body.usuario,
            password: hash,
            identificacion: req.body.identificacion,
            telefono: req.body.telefono,
            email: req.body.email,
            ciudad: req.body.ciudad,
            precio: req.body.precio,
            reserva: req.body.reserva,
            tarjeta: req.body.tarjeta,
            fechaCaducidad: req.body.fechaCaducidad,
            codigoCVS: req.body.cvs
        }).then(()=>{

            const textoCorreo="Se ha realizado su reserva con éxito. Datos de la reserva:\nNombre y Apellidos:"+req.body.nombre+" "+req.body.apellidos+
            "\nIdentificacion: "+req.body.identificacion+"\nTelefono: "+req.body.telefono+"\nEmail:"+req.body.email+
            "\nCiudad Reservada: "+req.body.ciudad+"\nPrecio: "+req.body.precio;
            const cartaReserva={
                to: req.body.email,
                subject: 'Reserva realizada con GEEKSHUBS',
                html: textoCorreo,
            }
            email.transporter.sendMail(cartaReserva,(error, info)=>{
                if(error) {
                    res.status(500).send(error,cartaReserva);
                    return ;
                }else{
                    res.status(200).send('Respuesta "%s"'+info.response);
                }
            })
            res.render('contactarAgencia',{
                title:"Agencia de Viajes de GEEKSHUBS -- Recibido",
                mensaje:'Estimado '+req.body.nombre+' su reserva ha sido realizada satisfactoriamente, recibirá un email con todos los datos de su reservación. Muchas gracias'
            });    
            //Sirve para comparar la contraseña
            //console.log(bcrypt.compareSync('abc123', hash));
            
        })
        
    }catch(err){
        console.log('Ha habido un error');
        res.render('error',{
            title:"Agencia de Viajes de GEEKSHUBS",
            status:404
        });
    }

})


module.exports = router;