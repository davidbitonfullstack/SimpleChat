"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiWebsocket = void 0;
const log4js_1 = require("log4js");
const url = require("url");
const WebSocket = require("ws");
const uuidv4 = require('uuid/v4');
const logger = log4js_1.getLogger();
class ApiWebsocket {
    constructor() {
        this.clients = [];
    }
    initialize(appserver) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`Initializing ApiWebsocket with appserver`);
            const wss = new WebSocket.Server({ noServer: true });
            console.log(wss);
            wss.on('connection', this.onConnection.bind(this));
            // appserver.on('upgrade', function upgrade(request, socket, head) {
            //   const pathname = url.parse(request.url).pathname;
            //   if (pathname === '/api/websocket') {
            //     wss.handleUpgrade(request, socket, head, function done(ws: any) {
            //       wss.emit('connection', ws, request);
            //     });
            //   } else {
            //     socket.destroy();
            //   }
            // });
            return this;
        });
    }
    publishMessageToClients(message) {
        logger.info(`publishing message ${message.action} to clients (${this.clients.length})`);
        this.clients.forEach((client) => {
            logger.info(`publishing message to client`);
            client.send(JSON.stringify(message));
        });
    }
    onConnection(ws, request) {
        ws.id = uuidv4();
        ws.name = url.parse(request.url, true).query.name;
        console.log(ws);
        logger.info(`Client connected to websocket id ${ws.id} userId ${ws.name} url ${request.url}`);
        ws.send(JSON.stringify({ message: 'Connected to websocket' }));
        this.clients.push(ws);
        ws.on('message', function message(msg) {
            logger.info(`Received message ${msg} from client`);
            ws.send(`right back at you: ${msg}`);
        });
        ws.on('close', function message(status) {
            const loggedOut = this.clients.find((client) => client.id == ws.id);
            if (!loggedOut)
                return;
            logger.info(`Received close ${JSON.stringify(status)} from client ${loggedOut.id} user:${loggedOut.userId}`);
            this.clients = this.clients.filter((client) => client.id != ws.id);
            //log out user if ws not reconnected in 5 seconds
            setTimeout(() => {
                if (this.clients.find((client) => client.id != ws.id)) {
                    logger.info(`User didn't reconnect, attempting to logout user ${loggedOut.userId}`);
                    this.userService.logout(loggedOut.userId);
                }
            }, 5000);
        }.bind(this));
    }
}
exports.ApiWebsocket = ApiWebsocket;
//# sourceMappingURL=api-web-socket.js.map