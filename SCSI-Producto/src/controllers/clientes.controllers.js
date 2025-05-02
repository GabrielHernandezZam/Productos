const pool = require ("../db")

//Para tener el archivo mas limpio
//Vamos a crear un controlador para las tareas
//El cual hara que el archivo de rutas sea mas limpio
const mostrarTodosClientes = async (req, res) =>{
    try{
        const result = await pool.query("SELECT * FROM Clientes")
        res.json(result.rows);
    }catch(error){
        next(error);
    }
}

//Mostrar un cliente
const mostrarUnCliente = async (req,res,next) => {
    try {
        //Extraer el id del url
        const { id } = req.params;
        //Busca en la tabla el dato puesto en la url
        //Siendo el $1 el id que se obtiene de la url
        const result = await pool.query("SELECT * FROM Clientes WHERE id = $1",[id]);
        //Si no encontro ninguna tarea con ese id, se duelve un codigo de estado 404
        if(result.rows.length === 0)
            return res.status(404).json({
                massage:"Tarea no encontrada"
            });
            //Muestra lo que encontro si hay algo
            res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

const crearClientes = async (req,res,next) => {
    //Son los datos que ingresaremos
    const {primer_nombre, segundo_nombre, apellido_paterno, 
        apellido_materno, sexo,fecha_de_nacimiento,RFC, correo,
        rol, id_usuario} = req.body
        try {
            //Insert en la base de datos
            const result = await pool.query(
                "INSERT INTO Clientes (primer_nombre, segundo_nombre,apellido_paterno, "+
                "apellido_materno, sexo, fecha_de_nacimiento, RFC, correo, rol, id_usuario )"+
                "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *", [
                    primer_nombre, segundo_nombre, apellido_paterno, 
                    apellido_materno, sexo,fecha_de_nacimiento,RFC, correo,
                    rol, id_usuario
                ]
            )
            //Nos retorna lo creado en la base de datos
            res.json(result.rows[0]);
        } catch (error) {
            next(error)
        }
}
const borrarClientes = async (req,res,next) =>{
    //Borrar clientes
    // Selecciona  el cliente por medio del id del url
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM Clientes WHERE id = $1 RETURNING *",[id]
        );
        if(result.rowCount === 0)
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}
const modificarCliente = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {
            primer_nombre, segundo_nombre, apellido_paterno, 
            apellido_materno, sexo,fecha_de_nacimiento,RFC, correo,
            rol
        } = req.body;
        const result = await pool.query(
            "UPDATE Clientes SET primer_nombre = $1, segundo_nombre = $2, apellido_paterno = $3,"+
            "apellido_materno = $4, sexo = $5, fecha_de_nacimiento = $6, RFC = $7, correo = $8,"+
            "rol = $9 WHERE id = $10 RETURNING *",[
                primer_nombre, segundo_nombre, apellido_paterno, 
                apellido_materno, sexo,fecha_de_nacimiento,RFC, correo,rol, id
            ]
        )
        if (result.rows.length === 0)
            return res.status(404).json({
                message:"Tarea no encontrada"
        })
        console.log(result);
        return res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    mostrarTodosClientes,
    crearClientes,
    mostrarUnCliente,
    borrarClientes,
    modificarCliente
}