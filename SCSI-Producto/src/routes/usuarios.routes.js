const {Router} = require('express');
const router = Router();
//Importacion para consultas
const pool = require("../db")
//Importamos las funciones del controlador
const{
    mostrarTodosUsuarios,
    crearUsuarios,
    borrarUsuarios,
    actualizarUsuarios
} = require("../controllers/usuarios.controllers")

//Rutas de funciones con sus direcciones
//Mostrar todos los usuarios
router.get('/usuarios',mostrarTodosUsuarios);
//Mostrar un usuario
router.get('/usuarios/:id',);
//Crear un usuario
router.post('/usuarios',crearUsuarios);
//Eliminar un usuario
router.delete('/usuarios/:id',borrarUsuarios);
//Actualizar un usuario
router.put('/usuarios/:id',actualizarUsuarios);

/*router.get('/',async(req,res)=>{
    const result = await pool.query('SELECT NOW ()');
    console.log(result);
    res.json(result.rows)
})*/

module.exports = router;