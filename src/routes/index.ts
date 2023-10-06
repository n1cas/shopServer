import { Application } from "express";
import productRoutes  from "./product.routes";
import cartRoutes from "./cart.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/products", authMiddleware, productRoutes);
    app.use("/api/profile/cart", authMiddleware, cartRoutes);

  }
}
