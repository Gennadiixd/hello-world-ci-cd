const express = require("express");
const router = express.Router();
const productsController = require("./products-controller");

router.get("/", productsController.getProducts);

module.exports = router;
