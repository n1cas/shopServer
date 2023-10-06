import { Router } from "express";
import CartController from "../controllers/cart.controller";

class CartRoutes {
  router = Router();
  controller = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.controller.createCart);
    this.router.get('/', this.controller.getCart);
    this.router.put('/', this.controller.updateCart);
    this.router.delete('/', this.controller.deleteAllItems);
    this.router.post('/checkout', this.controller.checkoutCart);
  }
}

export default new CartRoutes().router;
