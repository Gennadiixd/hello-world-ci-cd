const productsRepository = require("./products-repository");

class ProductsService {
  getProducts() {
    return productsRepository.getProducts();
  }
}

const productsService = new ProductsService();

module.exports = productsService;
