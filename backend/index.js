const express=module.require("express");
const app= express();
const cors = require("cors");
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//rutas
//init
app.listen(3000);
console.log("Servidor corriendo en el puerto 3000");