const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Travel = require('../models/Travel');
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







module.exports = router;