import cartRepository from "../repositories/cart.repository";
import { CartEntity } from "../schemas/cart.entity";
import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from "../schemas/order.entity";
import orderService from "./order.service";

export class CartService {
  createCart(userId: string): CartEntity {
    const newCart: CartEntity = {
      id: uuidv4(),
      userId,
      isDeleted: false,
      items: [],
    };
    return cartRepository.getCartByUserId(userId) || cartRepository.createCart(newCart);
  }

  getCartByUserId(userId: string): CartEntity | undefined {
    return cartRepository.getCartByUserId(userId);
  }

  updateCart(cart: CartEntity, newCart: CartEntity): CartEntity | undefined {
    return cartRepository.updateCart(cart, newCart);
  }

  createOrder(cart: CartEntity): OrderEntity {
    return orderService.createOrder(cart);
  }
}

export default new CartService();