import express, { Request, Response, Application } from 'express';
import morgan from 'morgan';
import Routes from './routes';
import dotenv from "dotenv";
import { initPostgreSqlOrm } from './orm/postgreSQL.orm';
import { RequestContext } from '@mikro-orm/core';
import mongoose from 'mongoose';
import { log } from './helpers/logger';
import * as util from 'util'
import * as fs from 'fs';

initEnvVariables();
const debuglog = util.debuglog('online-shop');
debuglog('online-shop debug message [%d]', 'STARTED');

const app: Application = express();
app.use(morgan('tiny'));


app.get('/health', async (req, res) => {
  const dbStatus = await connectMongoDB();

  if (dbStatus !== true) {
    res.status(500).json({
      message: 'Unhealthy',
      error: dbStatus
    });
  }
  res.status(200).json({
    message: 'Healthy',
    dbStatus
  });
});

function initEnvVariables () {
  try {
    dotenv.config();
    log('DOT ENV CONFIGURED, ENV', process.env.NODE_ENV);
  } catch (e) {
    console.error('DOT ENV CONFIG ERROR', e);
  }
}

async function connectMongoDB () {
  try {
    log('MONGO URL', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI || '');
    log('MONGO CONNECTED');
    return true;
  } catch (e) {
    console.error('MONGO CONNECT ERROR', e);
    return e;
  }
}


const routers = new Routes(app);

const PORT = process.env.API_PORT || 8000;

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
  await connectMongoDB();

  log ('ENV', process.env.NODE_ENV);
  const data = () => fs.readFileSync(require.resolve(`./configs/${process.env.NODE_ENV}.config.json`), { encoding: "utf8" });
  const config = JSON.parse(data());
  log('APP CONFIG', config);

  const server = app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
  });

  let connections: any = [];
  server.on('connection', (connection) => {
    connections.push(connection);

    connection.on('close', () => {
      connections = connections.filter((currentConnection: any) => currentConnection !== connection);
    });
  });

  
  function shutdown() {
    log('Received kill signal, shutting down gracefully');
  
    server.close(() => {
      log('Closed out remaining connections');
      process.exit(0);
    });
  
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 20000);
  
    // end current connections
    connections.forEach((connection: any) => connection.end());
  
    // then destroy connections
    setTimeout(() => {
      connections.forEach((connection: any) => connection.destroy());
    }, 10000);
  }
  
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

main().catch((err) => console.log(err));