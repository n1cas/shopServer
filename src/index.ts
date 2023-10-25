import express, { Request, Response, Application } from 'express';
import morgan from 'morgan';
import log4js from 'log4js';
import * as dotenv from 'dotenv';
import Routes from './routes';
import { initPostgreSqlOrm } from './orm/postgreSQL.orm';
import { RequestContext } from '@mikro-orm/core';

dotenv.config();
const app: Application = express();

app.use(morgan('tiny'))

const routers = new Routes(app);
const logger = log4js.getLogger();
logger.level = 'debug';


const PORT = process.env.PORT || 8000;


initPostgreSqlOrm().then((em) => {

  app.use((req, res, next) => {
    RequestContext.create(em, next);
  });


  app.get("/", (req: Request, res: Response): void => {
    res.send("Hello Typescript with Node.js!")
  });

  app.listen(PORT, () => console.log(`Server Running here 👉 http://localhost:${PORT}`));
}).catch((err) => {
  console.log('db error', err);
});
