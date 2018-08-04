const express = require('express');
const router = express.Router();
const parser = require('body-parser');
const Sequelize = require('sequelize');
const Travel = require('../models/Travel');
const Contacto = require("../models/Contacto");
const CONN = require('../connection/mysqlconn');

router.get('/home', async (req,res,next)=>{
    try{
        const ofertas = await Travel.findAll();        
        res.render('home',{
            title:"Agencia de Viajes de GEEKSHUBS",
            consulta: ofertas
        });
    }catch(err){
        console.log('Ha habido un error');
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


router.post('/contactarAgencia', async (req, res, next)=>{
    try{   
        Contacto.create({
            nombre: req.body.nombre,
            email: req.body.email,
            topico: req.body.topico,
            consulta: req.body.consulta
        }).then(()=>{
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


module.exports = router;