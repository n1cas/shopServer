import mongoose from 'mongoose';
import CartItem from './cart-entity.schema';

const orderSchema = new mongoose.Schema({
  id: String,
  userId: String,
  cartId: String,
  items: [CartItem.schema],
  payment: {
    type: String,
    address: String,
    creditCard: String,
  },
  delivery: {
    type: String,
    address: String,
  },
  comments: String,
  status: String,
  total: Number,
},
{ typeKey: '$type' });

const Orders = mongoose.model('Orders', orderSchema);

export default Orders;