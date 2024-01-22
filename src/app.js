const express = require("express");
const app = express();
const morgan = require("morgan");
const myConnection = require("express-myconnection");
const mysql = require("mysql");
const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT
} = require('./config');

//Middleware
// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
      database: DB_NAME,
    },
    "single"
  )
);

//Routes
const ProductsRoutes = require("./routes/productsRoutes");


app.use(ProductsRoutes);

//Servidor
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});

module.exports = app;
