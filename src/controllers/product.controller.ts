import { Request, Response } from "express";
import productService from "../services/product.service";

export default class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts()
      res.status(200).json({ data: products, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Something went wrong' } });
    }
  };

  async getProductById(req: Request, res: Response) {
    const productId = req.params.productId;

    try {
      const product = await productService.getProductById(productId);

      if (product) {
        res.status(200).json({ data: product, error: null });
      } else {
        res.status(404).json({ data: null, error: { message: 'Product Item Not Found' } });
      }
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Something went wrong' } });
    }
  }
}
