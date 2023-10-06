import { OrderEntity } from "../schemas/order.entity";

interface IOrderRepository {
  createOrder(order: OrderEntity): OrderEntity
}

class OrderRepository implements IOrderRepository {
  orders: OrderEntity[] = [];

  createOrder(order: OrderEntity): OrderEntity {
    this.orders.push(order);
    return order;
  }
}

export default new OrderRepository();