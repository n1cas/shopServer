import Cart from "../mongoose/cart.schema";
import { CartEntity, DeleteCartByAdminResponse } from "../schemas/cart.entity";

export class CartMongoDbRepository {
  constructor() {}

  async createCart(cart: CartEntity): Promise<CartEntity> {
    try {
      const newCart = new Cart(cart);
      const updatedCart = await newCart.save();
      console.log('updatedCart', updatedCart);
      return cart;
    } catch (e) {
      console.error('Error while creating cart', e);
      throw new Error('Error while creating cart');
    }
  }

  async getCartByUserId(userId: string): Promise<any | null> {
    try {
      return await Cart.findOne({ userId, isDeleted: false });
    } catch (e) {
      console.error('Error while getting cart', e);
      throw new Error('Error while getting cart');
    }
  }

  async updateCart(existingCart: CartEntity): Promise<CartEntity> {
    try {
      console.log('updateCart', existingCart);
        await Cart.updateOne( {id: existingCart.id}, {
        items: existingCart.items,
        isDeleted: existingCart.isDeleted
      });
      return existingCart;
    } catch (e) {
      console.error('Error while updating cart', e);
      throw new Error('Error while updating cart');
    }
  }
  
  async deleteCardById(existingCart: CartEntity): Promise<DeleteCartByAdminResponse> {
    try {
      await Cart.deleteOne( {id: existingCart.id});
      return {deleted: true};
    } catch (e) {
      console.error('Error while updating cart', e);
      throw new Error('Error while updating cart');
    }
  }
}

export const cartMongoDbRepository = new CartMongoDbRepository()