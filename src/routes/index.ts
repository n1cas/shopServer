import { Application } from "express";
import productRoutes  from "./product.routes";
import cartRoutes from "./cart.routes";
import authRoutes from "./auth.routes";
import { verifyToken } from "../middlewares/auth.middleware";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/products", verifyToken, productRoutes);
    app.use("/api/profile/cart", verifyToken, cartRoutes);
    app.use("/api/profile/cart", authRoutes);
  }
}
