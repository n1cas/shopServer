import { productDbRepository } from "../orm/postgreSQL.orm";
import { productMongoDbRepository } from "../repositories/product.mongo.db.repository";
import { ProductEntity } from "../schemas/product.entity";

export class ProductService {
  async getAllProducts(): Promise<ProductEntity[]> {
    // return await productDbRepository.getAllProducts(); // postgreSQL
    return await productMongoDbRepository.getAllProducts();
  };
  
  async getProductById(productId: string): Promise<ProductEntity | null> {
    // return await productDbRepository.getProductById(productId); // postgreSQL
    return await productMongoDbRepository.getProductById(productId);
  }
}

export default new ProductService();