const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const myConnection = require("express-myconnection");
const mysql = require("mysql");

//Middleware
// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "lopestegui1985",
      port: 3306,
      database: "test_crud_mysql",
    },
    "single"
  )
);

//Routes
const ProductsRoutes = require("./routes/productsRoutes");

app.use(ProductsRoutes);

//Servidor
app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});

module.exports = app;
