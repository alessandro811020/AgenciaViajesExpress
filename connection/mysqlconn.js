const Sequelize = require('sequelize');

const CONN = new Sequelize('agencia','root','',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        max:10,
        min:0,
        acquire: 30000,
        idle: 10000
    }
})

CONN.authenticate().then(()=>{
    console.log('la conexion ha funcionado');
}).catch(err=>{
    console.log(new Error(error));
})

module.exports = CONN;