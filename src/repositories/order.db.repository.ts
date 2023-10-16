import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { Order } from '../orm/entities/order.entities';
import { OrderEntity } from '../schemas/order.entity';

export class OrdersDbRepository {

  private readonly ordersRepository: EntityRepository<Order>
  constructor(private readonly orm: MikroORM) {
    this.ordersRepository = orm.em.getRepository(Order);
  }

  async createOrder(order: OrderEntity): Promise<OrderEntity> {
    try {
      await this.ordersRepository.persistAndFlush(new Order(order));
      console.log('Creating cart');
      return order;
    } catch (e) {
      console.error('Error while creating cart', e);
      throw new Error('Error while creating cart');
    }
  }
}
