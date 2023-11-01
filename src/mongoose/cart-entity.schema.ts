import mongoose from 'mongoose';
import Product from './product.schema';

const cartItemSchema = new mongoose.Schema({
  product: Product.schema,
  count: Number,
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;