import { productDbRepository } from "../orm/postgreSQL.orm";
import { ProductEntity } from "../schemas/product.entity";

export class ProductService {
  async getAllProducts(): Promise<ProductEntity[]> {
    return await productDbRepository.getAllProducts();
  };
  
  async getProductById(productId: string): Promise<ProductEntity | null> {
    return await productDbRepository.getProductById(productId);
  }
}

export default new ProductService();