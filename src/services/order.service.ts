import { ordersDbRepository } from "../orm/postgreSQL.orm";
import { orderMongoDbRepository } from "../repositories/order.mongo.db.repository";
import { CartEntity } from "../schemas/cart.entity";
import { OrderEntity } from "../schemas/order.entity";
import { v4 as uuidv4 } from 'uuid'


export class OrderService {
  async createOrder(cart: CartEntity): Promise<OrderEntity> {
    const order: OrderEntity = {
      id: uuidv4(),
      userId: cart.userId,
      cartId: cart.id,
      items: cart.items,
      payment: {
        type: 'paypal',
        address: 'Poland',
        creditCard: '***-****-****-1234'
      },
      delivery: {
        type: 'post',
        address: 'KRK'
      },
      comments: '',
      status: 'created',
      total: cart.items.length
    }
    try {
      // return await ordersDbRepository.createOrder(order); //postgreSQL
      return await orderMongoDbRepository.createOrder(order);
    } catch (error) {
      console.error('createOrder error', error);
      throw new Error('createOrder error');
    }
  }
}

export default new OrderService();