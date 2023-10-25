import Product from "../mongoose/product.schema";
import { ProductEntity } from "../schemas/product.entity";

export class ProductMongoDbRepository {
  constructor() {}

  getAllProducts = async (): Promise<ProductEntity[]> => {
    try {
      return await Product.find();
    } catch (e) {
      console.error('Error while getting products', e);
      throw new Error('Error while getting products');
    }
  };

  getProductById = async (productId: string): Promise<ProductEntity | null> => {
    try {
      return await Product.findOne({id: productId});
    } catch (e) {
      console.error('Error while getting products', e);
      throw new Error('Error while getting products');
    }
  };
}

export const productMongoDbRepository = new ProductMongoDbRepository();