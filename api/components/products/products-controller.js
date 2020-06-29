const productsService = require("./products-service");

class ProductsController {
  getProducts(req, res) {
    res.json(productsService.getProducts());
  }
}

const productsController = new ProductsController();

module.exports = productsController;
