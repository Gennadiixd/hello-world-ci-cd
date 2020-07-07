import productsService from "./products-service";

class ProductsController {
  getProducts(req, res) {
    res.json(productsService.getProducts());
  }
}

const productsController = new ProductsController();

export default productsController;
