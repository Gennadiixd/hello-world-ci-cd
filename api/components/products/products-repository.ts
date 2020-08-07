import { Repository, EntityRepository } from "typeorm";
import { injectable, inject } from "tsyringe";

import { ProductEntity } from "./product.entity";
import { IDBConnection } from "../../connection";

export interface IProductsRepository {
  getProducts: (any) => any;
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

  async getRepository() {
    const connection = await this.dbConnection.getConnection();
    return connection.getRepository(ProductEntity);
  }

  async getProducts(GetProductsDTO) {
    const repository = await this.getRepository();
    const { skip, take } = GetProductsDTO;

    const count = await repository
      .createQueryBuilder("products")
      .select()
      .getCount();

    const products = await repository.find({ skip, take });

    return {
      products,
      totalCount: count,
      totalPages: Math.floor(count / take) || 1,
    };
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
