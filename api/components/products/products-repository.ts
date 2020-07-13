import { injectable } from "tsyringe";
import { ProductEntity } from "./product.entity";
import { connection } from "../../connection";
import { Repository, EntityRepository } from "typeorm";

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
