
import { EntityManager, MikroORM, Options, defineConfig } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { CartDbRepository } from '../repositories/cart.db.repository';
import { OrdersDbRepository } from '../repositories/order.db.repository';
import { ProductDbRepository } from '../repositories/product.db.repository';



export const postgreSQLConfig:  Options<PostgreSqlDriver> = defineConfig ({
    dbName: 'node_gmp',
    user: 'node_gmp',
    type: 'postgresql',
    password: 'password123',
    debug: process.env.NODE_ENV !== 'production',
    entities: ['./dist/**/entities/*'],
    entitiesTs: ['./src/**/entities/*'],
    allowGlobalContext: true,
    seeder: {
      path: './dist/orm/seeders/', // path to the folder with seeders
      pathTs: './src/orm/seeders/', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
      defaultSeeder: 'DatabaseSeeder', // default seeder class name
      glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
      emit: 'ts', // seeder generation mode
      fileName: (className: string) => className, // seeder file naming convention
    },
  });
  
  export let orm: MikroORM;
  export let em: EntityManager;
  export let cartDbRepository: CartDbRepository
  export let productDbRepository: ProductDbRepository
  export let ordersDbRepository: OrdersDbRepository
  export const initPostgreSqlOrm = async (): Promise<EntityManager> => {
    orm = await MikroORM.init(postgreSQLConfig);
    cartDbRepository = new CartDbRepository(orm);
    productDbRepository = new ProductDbRepository(orm);
    ordersDbRepository = new OrdersDbRepository(orm);
    em = orm.em;
    return em
  };