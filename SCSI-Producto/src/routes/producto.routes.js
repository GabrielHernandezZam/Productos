//Producto
//Validaciones
const { body, validationResult } = require("express-validator");
//Elementos de productos
const { Router } = require("express");
const router = Router();

//Suma Asegurada
//Importacioones de funciones de suma asegurada
const {
  //Suma Asegurado
  mostrarSumasAseguradas,
  mostrarUnaSumaAsegurada,
  crearsumaAsegurada,
  borrarsumaAsegurada,
  updatesumaAsegurada,

  //Deducible
  mostrarDeducible,
  mostrarUnDeducible,
  crearDeducible,
  borrarDeducible,
  updateDeducible,

  //Coaseguro
  mostrarCoaseguro,
  mostrarUnCoaseguro,
  crearCoaseguro,
  borrarCoaseguro,
  updateCoaseguro,

  //Prima de tarifa
  mostrarPrimaTarifa,
  mostrarUnaPrimaTarifa,
  crearPrimaTarifa,
  borrarPrimaTarifa,
  updatePrimaTarifa,

  //Producto
  mostrarProducto,
  mostrarUnProducto,
  crearProducto,
  borrarProducto,
  updateProducto,
} = require("../controllers/producto.controllers");
const { handleInputErrors } = require("../middleware");

//Rutas de funciones con sus direcciones
//Rutas de Suma Asegurada
//Mostrar todas las Sumas Aseguradas
router.get("/productos/SumaAsegurada", mostrarSumasAseguradas);
//Mostrar un usuario
router.get("/productos/SumaAsegurada/:id", mostrarUnaSumaAsegurada);
//Crear un usuario
router.post("/productos/SumaAsegurada", crearsumaAsegurada);
//Eliminar un usuario
router.delete("/productos/SumaAsegurada/:id", borrarsumaAsegurada);
//Actualizar un usuario
router.put("/productos/SumaAsegurada/:id", updatesumaAsegurada);

//Duducible
router.get("/productos/Deducible", mostrarDeducible);
router.get("/productos/Deducible/:id", mostrarUnDeducible);
router.post("/productos/Deducible", crearDeducible);
router.delete("/productos/Deducible/:id", borrarDeducible);
router.put("/productos/Deducible/:id", updateDeducible);

//Coaseguro
router.get("/productos/Coaseguro", mostrarCoaseguro);
router.get("/productos/Coaseguro/:id", mostrarUnCoaseguro);
router.post("/productos/Coaseguro/", crearCoaseguro);
router.delete("/productos/Coaseguro/:id", borrarCoaseguro);
router.put("/productos/Coaseguro/:id", updateCoaseguro);

//Prima de Tarifa
router.get("/productos/PrimaTarifa", mostrarPrimaTarifa);
router.get("/productos/PrimaTarifa/:id", mostrarUnaPrimaTarifa);
router.post("/productos/PrimaTarifa", crearPrimaTarifa);
router.delete("/productos/PrimaTarifa/:id", borrarPrimaTarifa);
router.put("/productos/PrimaTarifa/:id", updatePrimaTarifa);

//Producto
router.get("/productos/", mostrarProducto);
router.get("/productos/:id", mostrarUnProducto);
router.post(
  "/productos/",
  // Validacion
  // Revisa si no esta vacio el espacio nombre, y si si esta vacio manda un mensaje de error
  // Y lo mismo con la descripcion
  body("nombre")
    .notEmpty()
    .withMessage("El nombre del PRODUCTO no puede ir vacio"),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripcion del PRODUCTO no puede ir vacio"),
  //Esta seccion lee si hay errores, si hay erroes mandar un json con el mensaje y el error
  //Funcion de api
  handleInputErrors,
  crearProducto
);
router.delete("/productos/:id", borrarProducto),
  router.put("/productos/:id", updateProducto);
module.exports = router;
