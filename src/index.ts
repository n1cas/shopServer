import express, { Request, Response, Application } from 'express';
import morgan from 'morgan';
import log4js from 'log4js';
import Routes from './routes';
import dotenv from "dotenv";
import { initPostgreSqlOrm } from './orm/postgreSQL.orm';
import { RequestContext } from '@mikro-orm/core';
import mongoose from 'mongoose';

dotenv.config();
const app: Application = express();

app.use(morgan('tiny'))

const routers = new Routes(app);
const logger = log4js.getLogger();
logger.level = 'debug';


const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js!")
});

// initPostgreSqlOrm().then((em) => {

//   app.use((req, res, next) => {
//     RequestContext.create(em, next);
//   });

//   app.get("/", (req: Request, res: Response): void => {
//     res.send("Hello Typescript with Node.js!")
//   });

//   app.listen(PORT, () => console.log());
// }).catch((err) => {
//   console.log('db error', err);
// });


async function main(): Promise<void> {
  try {
    dotenv.config();
    console.log('DOT ENV CONFIGURED');
  } catch (e) {
    console.error('DOT ENV CONFIG ERROR', e);
  }

  try {
    await mongoose.connect('mongodb://mongoadmin:bdung@localhost:27017/?authMechanism=DEFAULT');
    console.log('MONGO CONNECTED');
  } catch (e) {
    console.error('MONGO CONNECT ERROR', e);
  }

  app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
  });
}

main().catch((err) => console.log(err));