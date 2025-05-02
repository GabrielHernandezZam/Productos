const {Router} = require('express');
const router = Router();
//Importacion para consultas
const pool = require("../db")
//Importamos las funciones del controlador
const{
    obtenerDepartamentos,
    crearDepartamento
} = require("../controllers/departamentos.controllers")

//Rutas de funciones con sus direcciones
//Mostrar todos los usuarios
router.get('/departamento',obtenerDepartamentos);
//Mostrar un usuario
router.get('/departamento/:id',);
//Crear un usuario
router.post('/departamento',crearDepartamento);
//Eliminar un usuario
router.delete('/departamento/:id',);
//Actualizar un usuario
router.put('/departamento/id',);

router.get('/',async(req,res)=>{
    const result = await pool.query('SELECT * FROM Departamento');
    console.log(result);
    res.json(result.rows)
})

module.exports = router;