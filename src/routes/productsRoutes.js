const express = require("express");
const app = express();
const router = express.Router();
const ProductsController = require("../controllers/productsController");
const productsController = require("../controllers/productsController");

router.get("/", ProductsController.hello);
router.get("/getProducts", ProductsController.getProducts);
router.post("/newProduct", ProductsController.newProduct);
router.delete("/deleteProduct", ProductsController.deleteProduct);
router.put("/updateProduct", ProductsController.updateProduct);

module.exports = router;
