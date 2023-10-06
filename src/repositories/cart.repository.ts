import { CartEntity, cart } from "../schemas/cart.entity";

interface ICartRepository {
  createCart(cart: CartEntity): CartEntity;
  getCartByUserId(cartId: string): CartEntity | undefined;
  updateCart(existingCart: CartEntity, newCart: CartEntity): CartEntity | undefined;
}

class CartRepository implements ICartRepository {
  carts: CartEntity[] = [
    cart,
  ]

  createCart(cart: CartEntity): CartEntity {
    this.carts.push(cart);
    return cart
  }

  getCartByUserId(productId: string): CartEntity | undefined {
    return this.carts.find(product => product.id === productId);
  }

  updateCart(existingCart: CartEntity, newCart: CartEntity): CartEntity | undefined {
    return Object.assign(existingCart, newCart);
  }
}

export default new CartRepository();