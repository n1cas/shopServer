import { Request, Response } from "express";
import cartService, { CartService } from "../services/cart.service";
import { CartEntity, CartItemEntity, cartItemSchema } from "../schemas/cart.entity";
import { ProductEntity } from "../schemas/product.entity";

export default class CartController {

  async createCart(req: Request, res: Response) {
    const userId = req.headers['x-user-id'] as string;

    try {
      const cart = cartService.createCart(userId);
      res.status(201).json({ data: cart, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Something went wrong' } });
    }
  }

  async getCart(req: Request, res: Response) {
    const userId = req.headers['x-user-id'] as string;
  
    try {
      let cart = cartService.getCartByUserId(userId);
  
      if (cart) {
        res.status(200).json({ data: cart, error: null });
      } else {
        cart = cartService.createCart(userId);
        res.status(200).json({data: cart, error: null });
      }
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Something went wrong' } });
    }
  }

  async updateCart(req: Request, res: Response) {
    const userId = req.headers['x-user-id'] as string;
    const existingCart = cartService.getCartByUserId(userId);
  
    if (!existingCart) {
      res.status(404).json({ data: null, error: { message: 'Cart not found' } });
      return;
    }
  
    const product: CartItemEntity  = {
      product: req.body as ProductEntity,
      count: 1
    }
    const { error: validationError, value: updatedCart } = cartItemSchema.validate(product);

    if (validationError) {
      res.status(400).json({ data: null, error: validationError });
      return;
    }
    // Update cart logic here
  
    try {
      const updatedCart = cartService.updateCart(existingCart, { ...existingCart, items: [...existingCart.items, product] });
      res.status(200).json({ data: updatedCart, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'something went wrong' } });
    }
  }

  async deleteAllItems (req: Request, res: Response) {
    const userId = req.headers['x-user-id'] as string;
    const existingCart = cartService.getCartByUserId(userId);
  
    if (!existingCart) {
      res.status(404).json({ data: null, error: { message: 'Cart not found' } });
      return;
    }
  
    const newCart: CartEntity = {
      ...existingCart,
      isDeleted: true
    }
  
    try {
      cartService.updateCart(existingCart, newCart);
      res.status(200).json({ data: cartService.createCart(userId), error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'something went wrong' } });
    }
  }

  async checkoutCart(req: Request, res: Response) {
    const userId = req.headers['x-user-id'] as string;
    const cart = cartService.getCartByUserId(userId);
  
    if (!cart || cart.items.length === 0) {
      res.status(400).json({ data: null, error: { message: 'Cannot checkout an empty cart' } });
      return;
    }
  
    // Replace the following lines with your actual checkout logic
    const order = cartService.createOrder(cart);
  
    try {
      // Assuming order creation was successful
      res.status(200).json({ data: { order }, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Ooops, something went wrong' } });
    }
  }
}