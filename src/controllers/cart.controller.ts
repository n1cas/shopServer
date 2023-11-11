import { Request, Response } from "express";
import { CartItemEntity, cartItemSchema } from "../schemas/cart.entity";
import { ProductEntity } from "../schemas/product.entity";
import cartService from "../services/cart.service";
import orderService from "../services/order.service";

export default class CartController {

  async createCart(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;

    try {
      const cart = await cartService.createCart(userId);
      res.status(201).json({ data: cart, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Something went wrong' } });
    }
  }

  async getCart(req: Request, res: Response): Promise<void>  {
    const userId = req.user.id;

    try {
      let cart = await cartService.getCartByUserId(userId);
  
      if (cart) {
        res.status(200).json({ data: cart, error: null });
      } else {
        cart = await cartService.createCart(userId);
        res.status(200).json({data: cart, error: null });
      }
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Something went wrong' } });
    }
  }

  async updateCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user.id;
      const existingCart = await cartService.getCartByUserId(userId);
      if (!existingCart) {
        res.status(404).json({ data: null, error: { message: 'Cart not found' } });
        return;
      }
  
      const product: CartItemEntity  = {
        product: req.body as ProductEntity,
        count: 1
      };
  
      const { error: validationError} = cartItemSchema.validate(product);
  
      if (validationError) {
        res.status(400).json({ data: null, error: validationError });
        return;
      };

      // Update cart logic here
      existingCart.items.push(JSON.stringify(product) as any);
      res.status(200).json({ data: await cartService.updateCart(existingCart), error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Something went wrong' } });
    }
  }

  async deleteAllItems (req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    const existingCart = await cartService.getCartByUserId(userId);
  
    if (!existingCart) {
      res.status(404).json({ data: null, error: { message: 'Cart not found' } });
      return;
    }
  
    existingCart.isDeleted = true;
  
    try {
      await cartService.updateCart(existingCart);
      const newCart = await cartService.createCart(userId)
      res.status(200).json({ data: newCart, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Something went wrong' } });
    }
  }

  async checkoutCart(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const existingCart = await cartService.getCartByUserId(userId);
  
      if (!existingCart || existingCart.items.length === 0) {
        res.status(400).json({ data: null, error: { message: 'Cannot checkout an empty cart' } });
        return;
      }
      console.log('existingCart', existingCart);
      // Replace the following lines with your actual checkout logic
      const order = await orderService.createOrder(existingCart);
      existingCart.isDeleted = true;
      await cartService.updateCart(existingCart);
      // Assuming order creation was successful
      res.status(200).json({ data: { order }, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Something went wrong' } });
    }
  }

  deleteCartById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id;
    const existingCart = await cartService.getCartByUserId(userId);
  
    if (!existingCart) {
      res.status(404).json({ data: null, error: { message: 'Cart not found' }});
      return;
    }
  
    try {
      const result = await cartService.deleteCardById(existingCart);
      res.status(200).json({ data: result, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Something went wrong' } });
    }
  };
}