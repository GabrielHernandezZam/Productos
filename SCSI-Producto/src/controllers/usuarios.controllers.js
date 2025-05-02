const pool = require("../db");

//Para tener el archivo mas limpio
//Vamos a crear un controlador para las tareas
//El cual hara que el archivo de rutas sea mas limpio
const mostrarTodosUsuarios = async (req, res) =>{
    try{
        const result = await pool.query("SELECT * FROM Usuarios")
        res.json(result.rows);
    }catch(error){
        next(error);
    }
}

const crearUsuarios = async (req, res,next)=>{
    const {
        usuario, primer_nombre, segundo_nombre, apellido_paterno, 
        apellido_materno, correo, contrasena, id_departamento
    } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO Usuarios (nombre_usuario, primer_nombre, segundo_nombre, apellido_paterno,apellido_materno, correo, contrasena,id_departamento) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
            [usuario, primer_nombre, segundo_nombre, apellido_paterno, 
                apellido_materno, correo, contrasena, id_departamento]
        );
        //Retornamos la fila recien insertada
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
        
    }
}
const borrarUsuarios = async (req,res,next)=>{
    const {id} = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM Usuarios WHERE id = $1 RETURNING",[
                id
            ]
        );
        //Si el resultado que nos reguresa, la fila eliminada es igual a 0
        //Nos retornara un mensaje de tarea no encontrada
        if (result.rowCount === 0)
            return res.status(404).json({
            message: "Tarea no encontrada",
            });
        //Si la tarea fue eliminada, nos retorna un status 204
        return res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}
const actualizarUsuarios = async (req,res,next) =>{
    try {
        const {id} = req.params;
         const {
            primer_nombre, segundo_nombre, apellido_paterno, 
            apellido_materno, correo, contrasena
        } = req.body;
        const result = await pool.query(
            "UPDATE Usuarios SET primer_nombre = $1, segundo_nombre = $2,"+
            "apellido_paterno = $3, apellido_materno = $4, correo = $5, contrasena = $6 "+
            "WHERE id = $7 RETURNING *",[
                primer_nombre, segundo_nombre, apellido_paterno, 
                apellido_materno, correo, contrasena,id 
            ]
        )
        if (result.rows.length === 0)
            return res.status(404).json({
              message: "Tarea no encontrada",
            });
        
          //Si la tarea fue actualizada, nos retorna un status 204
          console.log(result);
          return res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }
}


module.exports = {
    mostrarTodosUsuarios,
    crearUsuarios,
    borrarUsuarios,
    actualizarUsuarios
}