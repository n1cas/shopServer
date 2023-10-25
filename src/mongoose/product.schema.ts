import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

export default Product;