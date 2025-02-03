const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.post("/add", productController.addProduct);
router.get("/delete/:id", productController.deleteProduct);
router.get("/update/:id", productController.getUpdateForm);
router.post("/update/:id", productController.updateProduct);

module.exports = router;
