// initializing logger first
import { getLogger } from 'log4js';
const logger = getLogger();
logger.level = 'debug';

import express = require('express');
import bodyParser = require('body-parser');
import { createServer } from 'http';
import { corsHandler } from './utils/cors';
import { ApiWebsocket } from './controllers/api-websocket';
import { Sequelize } from 'sequelize';
import { Controller } from './controllers/server.controller';

const sequelize = new Sequelize(
  process.env.DATABASE || 'simple_chat',
  process.env.DB_USERNAME || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
  }
);

const app = express();
const port = process.env.PORT || 8095;
const server = createServer(app);
const router = express.Router();

app.use(corsHandler);
app.use(bodyParser.json());
app.use('/api/messages', router);

server.listen(port, async () => {
  logger.info(`app started on port ${port}`);
  const websocket = await new ApiWebsocket();
  await websocket.initialize(server);
  const controller = await new Controller(sequelize);
  await controller.initialize(router);
});
