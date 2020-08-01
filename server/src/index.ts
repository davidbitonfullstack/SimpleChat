// initializing logger first
import { getLogger } from 'log4js';
const logger = getLogger();
logger.level = 'debug';

import express = require('express');
import bodyParser = require('body-parser');
import * as http from 'http';
import * as https from 'https';
import { corsHandler } from './utils/cors';
import { ApiWebsocket } from './controllers/api-websocket';
import { Sequelize } from 'sequelize';
import { Controller } from './controllers/server.controller';
import { readFileSync } from 'fs';
import path = require('path');

import WebSocket = require('ws');
import { Server } from 'http';

const sequelize = new Sequelize('simple_chat', 'root', 'root', {
  host: process.env.DATABASE_URL || '127.0.0.1',
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});

//TODO: in real app export to config file and use process.env
// const sequelize = new Sequelize('un5daxmcwi4eieeb', 'vlu8q30yl5ta16kv', 'd7e733oqgwh5dviy', {
//   host: 'nnmeqdrilkem9ked.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   dialect: 'mysql',
//   define: {
//     timestamps: false,
//   },
// });

const httpApp = express();
const app = express();

const keyPath = path.join(__dirname, './cert/key.pem');
const key = readFileSync(keyPath);
const certPath = path.join(__dirname, './cert/cert.pem');
const cert = readFileSync(certPath);

const httpsOptions = {
  key: key,
  cert: cert,
  // requestCert: false,
  // rejectUnauthorized: false,
};

httpApp.set('port', process.env.PORT || 8095);
httpApp.get('*', function (req, res, next) {
  res.redirect('https://' + req.headers.host + '/' + req.path);
});

app.set('port', process.env.PORT || 443);

// const app = express();
// const port = process.env.PORT || 8095;
// const server = createServer(app);
const server = https.createServer(httpsOptions, app);
const router = express.Router();

app.use(corsHandler);
app.use(bodyParser.json());
app.use('/api/messages', router);

http.createServer(httpApp).listen(httpApp.get('port'), async () => {
  console.log('Express HTTP server listening on port ' + httpApp.get('port'));
});

// const wss = new WebSocket.Server({ server });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });

//   ws.send('something');
// });

server.listen(app.get('port'), async () => {
  console.log('Express HTTPS server listening on port ' + app.get('port'));
  const websocket = await new ApiWebsocket();
  await websocket.initialize(server);
  const controller = await new Controller(sequelize);
  await controller.initialize(router);
});

// server.listen(port, async () => {
//   logger.info(`app started on port ${port}`);
//   const websocket = await new ApiWebsocket();
//   await websocket.initialize(server);
//   const controller = await new Controller(sequelize);
//   await controller.initialize(router);
// });
