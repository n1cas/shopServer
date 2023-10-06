import orderRepository from "../repositories/order.repository";
import { CartEntity } from "../schemas/cart.entity";
import { OrderEntity } from "../schemas/order.entity";
import { v4 as uuidv4 } from 'uuid'


export class OrderService {
  createOrder = (cart: CartEntity): OrderEntity => {
    cart.isDeleted = true;
    const order: OrderEntity = {
      id: uuidv4(),
      userId: cart.userId,
      cartId: cart.id,
      items: cart.items.map(e => ({...e})),
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
    return orderRepository.createOrder(order);
  }
}

export default new OrderService();