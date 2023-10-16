import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { OrderEntity } from '../../schemas/order.entity';
import { CartItemEntity } from '../../schemas/cart.entity';

type ORDER_STATUS = 'created' | 'completed';

@Entity()
export class Order implements OrderEntity {
  @PrimaryKey()
  id!: string;

  @Property()
  userId!: string;

  @Property()
  cartId!: string;

  @Property()
  items!: CartItemEntity[];

  @Property()
  payment!: { type: string, address?: string, creditCard?: string };

  @Property()
  delivery!: { type: string, address: string };

  @Property()
  comments!: string;

  @Property()
  status!: ORDER_STATUS;

  @Property()
  total!: number;

  constructor(order: OrderEntity) {
    this.id = order.id;
    this.userId = order.userId;
    this.cartId = order.cartId;
    this.items = order.items;
    this.payment = order.payment;
    this.delivery = order.delivery;
    this.comments = order.comments;
    this.status = order.status;
    this.total = order.total;
  }
}