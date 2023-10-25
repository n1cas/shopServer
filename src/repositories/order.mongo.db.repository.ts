import Orders from "../mongoose/order.schema";
import { OrderEntity } from "../schemas/order.entity";


export class OrderMongoDbRepository {
  constructor() {}

  async createOrder(order: OrderEntity): Promise<OrderEntity> {
    try {
      const orderModel = new Orders(order);
      console.log('NEW ORDER', order)
      await orderModel.save();
      console.log('ORDER CREATED');
      return order;
    } catch (e) {
      console.error('Error while creating order', e);
      throw new Error('Error while creating order');
    }
  }
}

export const orderMongoDbRepository = new OrderMongoDbRepository();