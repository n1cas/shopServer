import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Cart from './cart.schema';
import Product from './product.schema';


const initSeed = async () => {
  mongoose.connect('mongodb://mongoadmin:bdung@localhost:27017/?authMechanism=DEFAULT', {});

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', async () => {
    console.log('DatabaseSeeder run js');

    const cart = {
      id: uuidv4(),
      userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
      isDeleted: false,
      items: [],
    };

    const productData = [
      {
        id: '5c293ad0-19d0-41ee-baa3-4c648f9f7697',
        title: 'Book',
        description: 'Interesting book',
        price: 200,
      },
      {
        id: uuidv4(),
        title: 'Pen',
        description: 'Cute pen',
        price: 20,
      },
      {
        id: uuidv4(),
        title: 'Pencil',
        description: 'Cute pencil',
        price: 10,
      },
    ];

    try {
      const createdCart = await Cart.create(cart);
      console.log('Creating cart', createdCart);

      for (const product of productData) {
        const createdProduct = await Product.create(product);
        console.log('Creating product', createdProduct);
      }

      console.log('Seed completed');
      await db.close();
    } catch (e) {
      console.error('Error while seeding', e);
      await db.close();
    }
  });
}

initSeed().catch(err => console.log(err));