const Sequelize = require('sequelize');
const CONN = require('../connection/mysqlconn');

//modelo
const Oferta = CONN.define('ofertas',{
    ciudad: Sequelize.STRING,
    precio: Sequelize.INTEGER,
    reserva: Sequelize.INTEGER,
});

module.exports = Oferta;