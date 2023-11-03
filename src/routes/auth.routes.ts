import { Router } from "express";
import AuthController from '../controllers/auth.controller';

class AuthRoutes {
  router = Router();
  controller = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/register', this.controller.register);
    this.router.post('/login', this.controller.login);
  }
}

export default new AuthRoutes().router;
