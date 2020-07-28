// initializing logger first
import { getLogger } from 'log4js';
const logger = getLogger();
logger.level = 'debug';

import express = require('express');
import bodyParser = require('body-parser');
import WebSocket = require('ws');
// import { Server } from 'http';
import { createServer } from 'http';
import { corsHandler } from './utils/cors';
import { ApiWebsocket } from './controllers/api-websocket';

const app = express();
const port = process.env.PORT || 8095;
const server = createServer(app);
const router = express.Router();

app.use(corsHandler);
app.use(bodyParser.json());
app.use('/api/admin', router);

server.listen(port, async () => {
  logger.info(`app started on port ${port}`);
  const websocket = await new ApiWebsocket();
  await websocket.initialize(server);
});
