import { ProductEntity } from "../schemas/product.entity";

interface IProductRepository {
  getAllProducts(): ProductEntity[];
  getProductById(productId: string):ProductEntity | undefined
}

class ProductRepository implements IProductRepository {
  products: ProductEntity[] = [
    {
      id: '5c293ad0-19d0-41ee-baa3-4c648f9f7697',
      title: 'Book',
      description: 'Interesting book',
      price: 200,
    },
    {
      id: 'afdd68c4-d359-45e6-b9fd-c8fdb2a162a0',
      title: 'Pen',
      description: 'Cute pen',
      price: 20,
    },
    {
      id: 'afdd68c4-d359-45e6-b9fd-c8fdb2a162a1',
      title: 'Pencil',
      description: 'Cute pencil',
      price: 10,
    },
  ]

  getAllProducts() {
    return this.products;
  }

  getProductById(productId: string): ProductEntity | undefined {
    return this.products.find(product => product.id === productId);
  }
}

export default new ProductRepository();