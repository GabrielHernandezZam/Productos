const pool =require ("../db");

//Para tener el archivo mas limpio
//Vamos a crear un controlador para las tareas
//El cual hara que el archivo de rutas sea mas limpio
const obtenerDepartamentos = async (req, res, next) => {
    try {
      const result = await pool.query("SELECT * FROM Departamento");
      //Es lo que nos retornara la consulta, que al final es lo que vemos
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
};
const crearDepartamento = async (req, res,next) => {
    const {nombre, description} = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO Departamento (nombre, description) VALUES($1,$2) RETURNING *",
            [nombre, description]
        );
        //Retornamos la fila recien insertada
        res.json(result.rows[0]);

        
    } catch (error) {
        next(error);
    }
}

  module.exports = {
    obtenerDepartamentos,
    crearDepartamento
  };