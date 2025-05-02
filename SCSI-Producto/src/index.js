//Importaciones para el servidor de express
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
//Rutas de funciones
const clientesRoutes = require("./routes/clientes.routes");
const productoRoutes = require("./routes/producto.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const ventasRoutes = require("./routes/ventas.routes");
const departamentoRoutes = require("./routes/departamentos.routes");

//Inicializamos express
const app = express();
//Morgan para ver las peticiones por consola
app.use(morgan("dev"));
//Configuramos express para que entienda los datos que vienen de un JSON
app.use(express.json());
//Cors para que cualquier persona pueda hacer peticiones a nuestro servidor
app.use(cors());

//Usamos rutas
app.use(clientesRoutes);
app.use(productoRoutes);
app.use(usuariosRoutes);
app.use(departamentoRoutes);
//app.use(ventasRoutes);

//Manejador de errores
app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});
app.get("/api/", (req, res) => {
  res.json({ msg: "Desde API" });
});

// Iniciar servidor solo si el archivo se ejecuta directamente
if (require.main === module) {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server en puerto ${PORT}`);
  });
}

module.exports = app;
