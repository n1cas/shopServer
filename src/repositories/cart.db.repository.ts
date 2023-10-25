import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { Cart } from '../orm/entities/cart.entities';
import { CartEntity } from '../schemas/cart.entity';

export class CartDbRepository {

  private readonly cartRepository: EntityRepository<Cart>
  constructor(private readonly orm: MikroORM) {
    this.cartRepository = orm.em.getRepository(Cart);
  }

  async createCart(cart: CartEntity): Promise<CartEntity> {
    try {
      await this.cartRepository.persistAndFlush(new Cart(cart));
      return cart;
    } catch (e) {
      console.error('Error while creating cart', e);
      throw new Error('Error while creating cart');
    }
  }

  async getCartByUserId(userId: string): Promise<any | null> {
    try {
      return await this.cartRepository.findOne({ userId, isDeleted: false });
    } catch (e) {
      console.error('Error while getting cart', e);
      throw new Error('Error while getting cart');
    }
  }

  async updateCart(existingCart: CartEntity): Promise<any> {
    try {
      const cartToUpdated = await this.orm.em.findOne(Cart, {userId: existingCart.userId, isDeleted: false});
      if (cartToUpdated) {
        let updatedCart = {...cartToUpdated, ...existingCart};
        await this.orm.em.flush()
        return updatedCart;
      }
    } catch (e) {
      console.error('Error while updating cart', e);
      throw new Error('Error while updating cart');
    }
  }
}