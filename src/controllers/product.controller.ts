import { Request, Response } from "express";
import productRepository from "../repositories/product.repository";

export default class ProductController {
  async getProducts(req: Request, res: Response) {
    // const userId = req.headers['x-user-id'] as string;
    try {
      const products = productRepository.getAllProducts()
      res.status(200).json({ data: products, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: { message: 'Something went wrong' } });
    }
  };

  async getProductById(req: Request, res: Response) {
    // const userId = req.headers['x-user-id'] as string;
    const productId = req.params.productId;
  
    try {
      const product = productRepository.getProductById(productId);
  
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
