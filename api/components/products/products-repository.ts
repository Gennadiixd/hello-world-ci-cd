import { injectable } from "tsyringe";
import { ProductEntity } from "./product-entity";
import { connection } from "../../connection";

@injectable()
class ProductsRepository {
  async getProducts() {
    const connect = await connection;

    const products = await connect.manager.find(ProductEntity);

    return products;
  }
}

export default ProductsRepository;
