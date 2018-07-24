const express = require('express');
const router = express.Router();

router.get('/home', (req,res,next)=>{
    res.render('error',{
        title:"Agencia de Viajes de GEEKSHUBS"
    });
})







module.exports = router;