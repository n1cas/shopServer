import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { Product } from '../orm/entities/product.entities';
import { ProductEntity } from '../schemas/product.entity';

export class ProductDbRepository {
  private readonly productRepository: EntityRepository<Product>;

  constructor(private readonly orm: MikroORM) {
    this.productRepository = orm.em.getRepository(Product);
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    try {
      return await this.productRepository.findAll();
    } catch (e) {
      console.error('Error while getting products', e);
      throw new Error('Error while getting products');
    }
  };

  async getProductById(productId: string): Promise<ProductEntity | null> {
    try {
      return await this.productRepository.findOne({ id: productId });
    } catch (e) {
      console.error('Error while getting products', e);
      throw new Error('Error while getting products');
    }
  };

}