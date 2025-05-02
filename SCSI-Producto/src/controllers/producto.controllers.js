//Productos y elementos de los productos

const pool = require("../db");

//Producto
//Mostrar producto
const mostrarProducto = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM Producto");
    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
//Mostrar un producto
const mostrarUnProducto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM Producto WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Producto no encontrada",
      });
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//Crear producto
const crearProducto = async (req, res, next) => {
  try {
    const { nombre, descripcion, id_usuario } = req.body;
    const result = await pool.query(
      "INSERT INTO Producto (nombre, descripcion,id_usuario) VALUES ($1,$2,$3) RETURNING *",
      [nombre, descripcion, id_usuario]
    );
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//Borrar Producto
const borrarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM Producto WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
//Actualizar Producto
const updateProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const result = await pool.query(
      "UPDATE Producto SET nombre =$1, descripcion = $2 WHERE id = $3 RETURNING *",
      [nombre, descripcion, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//Sumas aseguradas
const mostrarSumasAseguradas = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM SumaAsegurada");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
// Mostrar una suma asegurada
const mostrarUnaSumaAsegurada = async (req, res, next) => {
  try {
    //Extraer el id de la url
    const { id } = req.params;
    //Busca en la tabla con el id de la url usando el $1 donde estara el id
    const result = await pool.query(
      "SELECT * FROM SumaAsegurada WHERE id = $1",
      [id]
    );
    //Si no encontro una suma, devuele un mensaje de codigo 404 con mensaje
    if (result.rows.length === 0)
      return res.status(404).json({
        massage: "Tarea no encontrada",
      });
    //Si la tarea, existe, se devuelve un JSON con los datos del id
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//Crear una Suma Asegurada
const crearsumaAsegurada = async (req, res, next) => {
  const { id_producto, monto, factor } = req.body;
  //El $1 son se guardara el valor de la suma y la cargara en la base de datos
  //Utilizamos al final RETURING * para que nos retorne la fila recien insertada
  //Await esperera a que la consulta termine antes de continuar
  //Pool ejecuta la consulta en la base de datos
  //Y lo guardamos en la variable result para poder obtener el valor de la tarea creada
  try {
    const result = await pool.query(
      "INSERT INTO SumaAsegurada (id_producto,monto,factor) VALUES ($1,$2,$3) RETURNING *",
      [id_producto, monto, factor]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const borrarsumaAsegurada = async (req, res, next) => {
  //Extrae el id del url
  const { id } = req.params;
  try {
    //Hacemos la busqueda y eliminamos con el id que se obtien con el url
    //Y retorna la fila eliminada con RETURNING *
    const result = await pool.query(
      "DELETE FROM SumaAsegurada WHERE id = $1 RETURNING *",
      [id]
    );
    //Si no encuentra un registro, retornara un mensaje de una tarea no encontrada
    if (result.rowCount === 0) return res.status(404).json({});
    //Si la tarea fue eliminada, nos retorna un status 204
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const updatesumaAsegurada = async (req, res, next) => {
  try {
    //Extrae el id del url
    const { id } = req.params;
    //creamos constantes para que nos muestren los datos
    const { id_producto, monto, factor } = req.body;
    const result = await pool.query(
      "UPDATE SumaAsegurada SET id_producto = $1, monto = $2, factor = $3 WHERE id = $4 RETURNING *",
      [id_producto, monto, factor, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        massage: "Tarea no encontrada",
      });
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//Deducible
//Mostrar deducible
const mostrarDeducible = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM Deducible");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
//Mostrar un deducible
const mostrarUnDeducible = async (req, res, next) => {
  try {
    //Extrae el id del url
    const { id } = req.params;
    //Busca en la tabla task donde el id sea igual al numero que esta en la url
    //siendo el $1 el id que se obtiene de la url
    const result = await pool.query("SELECT * FROM Deducible WHERE id = $1", [
      id,
    ]);
    //Si no encontró ninguna tarea con ese id, devuelve un código de estado 404 con un mensaje
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    //Si la tarea existe, se devuelve en formato JSON la primera fila de result.rows.
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//Crear un deducible
const crearDeducible = async (req, res, next) => {
  //Variable del dato que se va insertar en la base de datos
  try {
    const { id_producto, porcentaje, factor } = req.body;
    //Consulta de la base de datos
    const result = await pool.query(
      "INSERT INTO Deducible (id_producto,porcentaje, factor) VALUES($1,$2,$3) RETURNING *",
      [id_producto, porcentaje, factor]
    );
    //Devuelve lo creado en la bd
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//Borrar deducible
const borrarDeducible = async (req, res, next) => {
  //Seleccionamo id del url
  const { id } = req.params;
  try {
    //Hacemos la busqueda y eliminamos con el id que se obtiene de la url
    //Y retornamos la fila eliminada con RETURNING *
    const result = await pool.query(
      "DELETE FROM Deducible WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const updateDeducible = async (req, res, next) => {
  //Seleccionamos id del url
  try {
    const { id } = req.params;
    const { id_producto, porcentaje, factor } = req.body;
    const result = await pool.query(
      "UPDATE Deducible SET id_producto = $1, porcentaje =$2, factor = $3 WHERE id = $4 RETURNING *",
      [id_producto, porcentaje, factor, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Deducible no encontrado",
      });
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//Coaseguro
//Mostrar Coaseguro
const mostrarCoaseguro = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM Coaseguro");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
const mostrarUnCoaseguro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM Coaseguro WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Coaseguro no disponible",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//Crear coaseguro
const crearCoaseguro = async (req, res, next) => {
  try {
    const { id_producto, porcentaje, topeCoaseguro, factor } = req.body;
    const result = await pool.query(
      "INSERT INTO Coaseguro (id_producto,porcentaje,topeCoaseguro,factor)VALUES($1,$2,$3,$4) RETURNING *",
      [id_producto, porcentaje, topeCoaseguro, factor]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//Eliminar coaseguro
const borrarCoaseguro = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM Coaseguro WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Coaseguro no encontrada",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
//Actualizar Coaseguro
const updateCoaseguro = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { id_producto, porcentaje, topeCoaseguro, factor } = req.body;
    const result = await pool.query(
      "UPDATE Coaseguro SET id_producto = $1,porcentaje =$2, topeCoaseguro = $3, factor = $4 WHERE id = $5 RETURNING *",
      [id_producto, porcentaje, topeCoaseguro, factor, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Coaseguro no encontrado",
      });
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//Prima de tarifa
//Mostrar Primas de tarifa
const mostrarPrimaTarifa = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM PrimaDeTarifa");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
//Mostrar una prima de tarifa
const mostrarUnaPrimaTarifa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM PrimaDeTarifa WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Prima no encontrada",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const crearPrimaTarifa = async (req, res, next) => {
  try {
    const { id_sumaAsegurada, edad, sexo, prima, factor } = req.body;
    const result = await pool.query(
      "INSERT INTO PrimaTarifa (id_sumaAsegurada,edad, sexo, prima, factor)" +
        "VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [id_sumaAsegurada, edad, sexo, prima, factor]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//borrar Prima de Tarifa
const borrarPrimaTarifa = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM PrimaDeTarifa WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({
        message: "No fue encontrada esta tarifa",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
//Actualizar Prima de Tarifa
const updatePrimaTarifa = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { id_sumaAsegurada, edad, sexo, prima, factor } = req.body;
    const result = await pool.query(
      "UPDATE PrimaTarifa SET id_sumaAsegurada = $1,edad = $2, sexo = $3, prima = $4, factor = $5 WHERE id = $6 RETURNING *",
      [id_sumaAsegurada, edad, sexo, prima, factor, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    console.log(result);
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  //Suma Asegurada
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
};
