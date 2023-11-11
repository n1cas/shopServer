import { Router } from "express";
import CartController from "../controllers/cart.controller";
import { verifyAbilityToDeleteCart } from "../middlewares/cart.middleware";

class CartRoutes {
  router = Router();
  controller: CartController = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.controller.createCart);
    this.router.get('/', this.controller.getCart);
    this.router.put('/', this.controller.updateCart);
    this.router.delete('/', this.controller.deleteAllItems);
    this.router.post('/checkout', this.controller.checkoutCart);
    this.router.delete('/cart/:id', verifyAbilityToDeleteCart, this.controller.deleteCartById);
  }
}

export default new CartRoutes().router;
