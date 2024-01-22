class ProductsController {
  hello(req, res) {
    res.send("Hello World");
  }

  getProducts(req, res) {

    req.getConnection((err, conn) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error de conexión a la base de datos" });
        return;
      }

      conn.query("SELECT * FROM products", (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Error al ejecutar la consulta" });
          return;
        } else {
          console.log("Lectura realizada correctamente:", rows);
          res.send({ msg: "Lectura realizada perfectamente", products: rows });
        }
      });
    });
  }

  newProduct(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error de conexión a la base de datos" });
        return;
      }

      conn.query("INSERT INTO products SET ?", data, (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Error al ejecutar la consulta" });
          return;
        } else {
          console.log("Datos insertados correctamente:", rows);
          res.send({ msg: "Post enviado perfectamente" });
        }
      });
    });
  }

  deleteProduct(req, res) {
    //guardo el ID
    const id = req.body.product_id;

    //Conecto a DB
    req.getConnection((err, conn) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error de conexión a la base de datos" });
        return;
      }

      //Valido si el ID existe en la DB
      conn.query(
        "SELECT * FROM products WHERE product_id = ?",
        id,
        (err, rows) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .json({ error: "Error al verificar la existencia del producto" });
            return;
          }

          if (rows.length === 0) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
          }

          // El producto existe, puedes continuar con la eliminación.
          conn.query(
            "DELETE FROM products WHERE product_id = ?",
            id,
            (err, rows) => {
              if (err) {
                console.error(err);
                res
                  .status(500)
                  .json({ error: "Error al ejecutar la consulta DELETE" });
                return;
              }

              console.log("Producto borrado correctamente:", rows);
              res.send({ msg: "Producto borrado con éxito" });
            }
          );
        }
      );
    });
  }

  updateProduct(req, res) {
    //guardo los fileds que quiero modificar
    const { product_id, product_name, price } = req.body;

    //Conecto a DB
    req.getConnection((err, conn) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error de conexión a la base de datos" });
        return;
      }

      //Valido si el ID existe en la DB
      conn.query(
        "SELECT * FROM products WHERE product_id = ?",
        product_id,
        (err, rows) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .json({ error: "Error al verificar la existencia del producto" });
            return;
          }

          if (rows.length === 0) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
          }

          // El producto existe, puedes continuar con la eliminación.
          const updateQuery =
            "UPDATE products SET product_name = ?, price = ? WHERE product_id = ?";
          conn.query(
            updateQuery,
            [product_name, price, product_id],
            (err, rows) => {
              if (err) {
                console.error(err);
                res
                  .status(500)
                  .json({ error: "Error al ejecutar la consulta UPDATE" });
                return;
              }

              console.log("Producto actualizado correctamente:", rows);
              res.send({ msg: "Producto actualizado con éxito" });
            }
          );
        }
      );
    });
  }


}

module.exports = new ProductsController();
