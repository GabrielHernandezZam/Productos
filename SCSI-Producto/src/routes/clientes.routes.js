const {Router} = require('express');
const router = Router();
//Importacion para consultas
const pool = require("../db")
//Importamos las funciones del controlador
const{
    mostrarTodosClientes,
    crearClientes,
    mostrarUnCliente,
    borrarClientes,
    modificarCliente
} = require("../controllers/clientes.controllers")

//Rutas de funciones con sus direcciones
//Mostrar todos los usuarios
router.get('/clientes',mostrarTodosClientes);
//Mostrar un usuario
router.get('/clientes/:id',mostrarUnCliente);
//Crear un usuario
router.post('/clientes',crearClientes);
//Eliminar un usuario
router.delete('/clientes/:id',borrarClientes);
//Actualizar un usuario
router.put('/clientes/:id',modificarCliente);

module.exports = router;