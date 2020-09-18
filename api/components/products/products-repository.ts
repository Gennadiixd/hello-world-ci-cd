import { Repository, EntityRepository, Like } from "typeorm";
import { injectable, inject } from "tsyringe";

import { ProductEntity } from "./product.entity";
import { IDBConnection } from "../../db/connection";

export interface IProductsRepository {
  getProducts: (any) => any;
  createProduct: (any) => any;
  getProduct: (any) => any;
}

@injectable()
@EntityRepository(ProductEntity)
class ProductsRepository extends Repository<ProductEntity> {
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

  async getProducts(getProductsDTO) {
    const repository = await this.getRepository();
    const { take } = getProductsDTO;

    const count = await repository
      .createQueryBuilder("products")
      .select()
      .getCount();

    const result = {} as any;

    result.products = await repository.find(getProductsDTO.params);
    result.totalCount = count;
    result.totalPages = Math.floor(count / take) || 1;

    return result;
  }

  async getProduct(id) {
    const connectionManager = await this.getConnectManager();
    return connectionManager.findOne(ProductEntity, id);
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
