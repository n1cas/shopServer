import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { CartEntity, CartItemEntity } from '../../schemas/cart.entity';

@Entity()
export class Cart implements CartEntity {
  @PrimaryKey()
  id!: string;

  @Property()
  userId!: string;

  @Property()
  isDeleted!: boolean;

  @Property()
  items: CartItemEntity[] = [];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.userId = cart.userId;
    this.isDeleted = cart.isDeleted;
    this.items = cart.items;
  }
}