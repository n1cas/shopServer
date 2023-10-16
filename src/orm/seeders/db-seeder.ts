
import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { v4 as uuidv4 } from 'uuid';
import { Cart } from '../entities/cart.entities';
import { cart } from './../../schemas/cart.entity';
import { Product } from '../entities/product.entities';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    console.log('DatabaseSeeder run js');
    em.create(Cart, {
      ...cart,
      items: [JSON.stringify(cart.items[0].product) as any]
    });

    em.create(Product, {
      id: uuidv4(),
      title: 'Book',
      description: 'Interesting book',
      price: 200,
    });
    em.create(Product, {
      id: uuidv4(),
      title: 'Pen',
      description: 'Cute pen',
      price: 20,
    });
    em.create(Product, {
      id: uuidv4(),
      title: 'Pencil',
      description: 'Cute pencil',
      price: 10,
    });
  }
}