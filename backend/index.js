const express=module.require("express");
const app= express();
const cors = require("cors");
const conexionSequelize = require("./database");
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//rutas
app.use("/api",require("./routes/cuentaRoute"));
//init
app.listen(3000);
conexionSequelize.authenticate();
console.log("Servidor corriendo en el puerto 3000");