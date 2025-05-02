const exit = require("node:process");
const { db } = require("./config");

const limpiarDB = async () => {
  try {
    await db.sync({ force: true });
    console.log("Datos eliminados correctamente");
    exit(0);
  } catch (error) {
    console.log(error);
    exit(1);
  }
  if (process.argv[2] === "--clear") {
    limpiarDB();
  }
  console.log(process.argv);
};
