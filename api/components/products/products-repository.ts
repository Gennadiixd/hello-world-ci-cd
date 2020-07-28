import { Repository, EntityRepository } from "typeorm";
import { injectable, inject } from "tsyringe";

import { ProductEntity } from "./product.entity";
import { IDBConnection } from "../../connection";

export interface IProductsRepository {
  getProducts: () => any;
  createProduct: (any) => any;
  getProduct: (any) => any;
}

@injectable()
@EntityRepository(ProductEntity)
class ProductsRepository extends Repository<any> {
  constructor(@inject("IDBConnection") private dbConnection: IDBConnection) {
    super();
  }

  async getConnectManager() {
    const { manager } = await this.dbConnection.getConnection();
    return manager;
  }

  async getProducts() {
    const connectionManager = await this.getConnectManager();
    const products = await connectionManager.find(ProductEntity);
    return products;
  }

  async getProduct(id) {
    const connectionManager = await this.getConnectManager();
    const product = await connectionManager.findOne(ProductEntity, id);
    return product;
  }

  async createProduct(createProductDTO) {
    const { title, description, price, image } = createProductDTO;

    const product = new ProductEntity();

    product.title = title;
    product.description = description;
    product.price = price;
    product.image = image;

    await product.save();

    return product;
  }
}

export default ProductsRepository;
