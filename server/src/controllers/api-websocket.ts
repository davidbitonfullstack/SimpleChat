import { getLogger } from 'log4js';
import url = require('url');
import WebSocket = require('ws');
import { Server } from 'http';

const logger = getLogger();

export class ApiWebsocket {
  constructor() {}

  public async initialize(server) {
    logger.info(`Initializing ApiWebsocket with appserver`);

    const wss = new WebSocket.Server({ noServer: true });

    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      });
    });

    server.on('upgrade', function upgrade(request, socket, head) {
      const pathname = url.parse(request.url).pathname;
      console.log(pathname);
      if (pathname === '/api/websocket') {
        wss.handleUpgrade(request, socket, head, function done(ws: any) {
          wss.emit('connection', ws, request);
        });
      } else {
        socket.destroy();
      }
    });

    return this;
  }
}
