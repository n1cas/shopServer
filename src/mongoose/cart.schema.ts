import mongoose from 'mongoose';
import CartItem from './cart-entity.schema';

const cartSchema = new mongoose.Schema({
  id: String,
  userId: String,
  isDeleted: Boolean,
  items: [CartItem.schema],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;