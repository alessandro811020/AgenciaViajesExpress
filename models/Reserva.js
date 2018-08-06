const Sequelize = require('sequelize');
const CONN = require('../connection/mysqlconn');

//modelo
const Reserva = CONN.define('reservas',{
    nombre: Sequelize.STRING,
    apellidos: Sequelize.STRING,
    usuario: Sequelize.STRING,
    password: Sequelize.STRING,
    identificacion: Sequelize.STRING,
    telefono: Sequelize.INTEGER,
    email: Sequelize.STRING,
    ciudad: Sequelize.STRING,
    precio: Sequelize.INTEGER,
    reserva: Sequelize.INTEGER, 
    tarjeta: Sequelize.INTEGER,
    fechaCaducidad: Sequelize.STRING,
    codigoCVS: Sequelize.INTEGER
    
});

// Reserva.sync({force: false})
//     .then(() => {
//         return Reserva.create({
//             nombre: "nombre",
//             apellidos:'fndsflsdfn',
//             usuario:"fsddfsd",
//             password: "1234",
//             identificacion:'423222',
//             telefono: 23233423,
//             email:"sfs@sdfsd2",
//             ciudad:'dfsfdf',
//             precio:323,
//             reserva:43,
//             tarjeta: 243432423424,
//             fechaCaducidad:'34/3241',
//             codigoCVS: 324
//         })
//     })
//     .then(res => {
//         console.log(res)
//     })

module.exports = Reserva;