class ProductsRepository {
  getProducts() {
    return [1, 2, 3, 5];
  }
}

const productsRepository = new ProductsRepository();

module.exports = productsRepository;
