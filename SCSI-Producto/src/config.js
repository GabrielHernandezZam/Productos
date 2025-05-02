//Agregamos dotenv para indicar sobre la variable
//de entorno que usaremos
const {config} = require('dotenv');
config();

//Expotamos los modulos de la variable de entorno
//Los cargamos a la variable db
module.exports = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    }
}