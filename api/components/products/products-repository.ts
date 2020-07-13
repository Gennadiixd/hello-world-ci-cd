import { Repository, EntityRepository } from "typeorm";
import { injectable } from "tsyringe";
import { ProductEntity } from "./product.entity";
import { connection } from "../../connection";

export interface IProductsRepository {
  getProducts: () => any;
}

@injectable()
@EntityRepository(ProductEntity)
class ProductsRepository extends Repository<any> {
  async getProducts() {
    const connect = await connection;

    const products = await connect.manager.find(ProductEntity);

    return products;
  }
}

export default ProductsRepository;
