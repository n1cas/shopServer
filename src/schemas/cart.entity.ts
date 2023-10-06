import Joi from 'joi';
import { ProductEntity, product as bookProduct } from './product.entity'

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

const cartItem: CartItemEntity = {
  product: bookProduct,
  count: 2,
}

export const cart: CartEntity = {
  id: '1434fec6-cd85-420d-95c0-eee2301a971d',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  isDeleted: false,
  items: [cartItem],
}

export const cartItemSchema = Joi.object({
  product: Joi.object({
    id: Joi.string().uuid().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
  }),
  count: Joi.number().integer().min(1).required(),
});

export const cartSchema = Joi.object({
  id: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
  isDeleted: Joi.boolean().required(),
  items: Joi.array().items(cartItemSchema).required(),
});