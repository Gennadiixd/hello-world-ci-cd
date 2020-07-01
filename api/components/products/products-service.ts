import productsRepository from "./products-repository";

class ProductsService {
  getProducts() {
    return productsRepository.getProducts();
  }
}

const productsService = new ProductsService();

export default productsService;
