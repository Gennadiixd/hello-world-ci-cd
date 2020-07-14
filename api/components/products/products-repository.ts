import { Repository, EntityRepository } from "typeorm";
import { injectable, inject } from "tsyringe";
import { ProductEntity } from "./product.entity";
import DBConnection from '../../connection';

export interface IProductsRepository {
  getProducts: () => any;
}

@injectable()
@EntityRepository(ProductEntity)
class ProductsRepository extends Repository<any> {
  constructor(@inject("IDBConnection") private dbConnection: DBConnection) {
    super();
  }

  async getProducts() {
    const connect = await this.dbConnection.getConnection();
    
    const products = await connect.manager.find(ProductEntity);

    return products;
  }
}

export default ProductsRepository;
