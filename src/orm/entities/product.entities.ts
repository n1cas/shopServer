
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ProductEntity } from '../../schemas/product.entity';

@Entity()
export class Product implements ProductEntity {
  @PrimaryKey()
  id!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;
}