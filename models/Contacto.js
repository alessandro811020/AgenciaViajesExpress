const Sequelize = require('sequelize');
const CONN = require('../connection/mysqlconn');

//modelo
const Contacto = CONN.define('contactos',{
    nombre: Sequelize.STRING,
    email: Sequelize.STRING,
    topico: Sequelize.STRING,
    consulta: Sequelize.STRING
});

// Contacto.sync({force: false})
//     .then(() => {
//         return Contacto.create({
//             nombre: "nombre",
//             email:"sfs@sdfsd2",
//             topico: "sdfsdfsdf",
//             consulta: "req.body.consulta"
//         })
//     })
//     .then(res => {
//         console.log(res)
//     })

module.exports = Contacto;