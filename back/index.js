const cors = require('cors');
const express = require("express");

// crear servidor
const app = express();

// Para poder leer json en el body
app.use(express.json());

app.use(cors());

// Crear base si no existe
require("./base-orm/sqlite-init");

const personasRouter = require("./routes/Personas");
app.use('/', personasRouter);

const empleadosRouter = require("./routes/Empleado");
app.use(empleadosRouter);

const monederoVirtualRouter = require("./routes/MonederoVirtual");
app.use(monederoVirtualRouter);

const telefonoRouter = require("./routes/Telefono");
app.use(telefonoRouter);

const cuentaBancariaRouter = require("./routes/CuentaBancaria");
app.use(cuentaBancariaRouter);

const port = 4000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

module.exports = app; // para testing