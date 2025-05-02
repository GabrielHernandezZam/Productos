//Nos conectamos a la base de datos con la libreria pg
//y exportamos el objeto pool que es el que nos permite hacer las consultas
const {Pool} = require ('pg');
const {db} = require('./config')

//Creamos la conexion a la base de datos
const pool =new Pool({
    user:db.user,
    password:db.password,
    host:db.host,
    port: db.port,
    database:db.database
})

module.exports=pool;
