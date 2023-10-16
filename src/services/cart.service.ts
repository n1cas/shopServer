import { CartEntity } from "../schemas/cart.entity";
import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from "../schemas/order.entity";
import { cartDbRepository, ordersDbRepository } from "../orm/postgreSQL.orm";

export class CartService {
  async createCart(userId: string): Promise<CartEntity> {
    const newCart: CartEntity = {
      id: uuidv4(),
      userId,
      isDeleted: false,
      items: [],
    };

    const existingCart = await cartDbRepository.getCartByUserId(userId)
    if (existingCart) {
      return existingCart;
    }
    return await cartDbRepository.createCart(newCart);
  }

  async getCartByUserId(userId: string): Promise<CartEntity> {
    return await cartDbRepository.getCartByUserId(userId);
  }

  async updateCart(existingCard: CartEntity): Promise<CartEntity> {
    console.log('Updating cart', existingCard);
    return cartDbRepository.updateCart(existingCard);
  }

  async createOrder(cart: CartEntity): Promise<OrderEntity | undefined>{
    const order: OrderEntity = {
      id: uuidv4(),
      userId: cart.userId,
      cartId: cart.id,
      items: cart.items.map(e => ({ ...e })),
      payment: {
        type: 'paypal',
        address: 'Poland',
        creditCard: '***-****-****-1234'
      },
      delivery: {
        type: 'post',
        address: 'KRK'
      },
      comments: '',
      status: 'created',
      total: cart.items.length
    }
    try {
      return await ordersDbRepository.createOrder(order);
    } catch (error) {
      console.error('ERROR ON ORDER CREATION', error);
    }
  }
}

export default new CartService();