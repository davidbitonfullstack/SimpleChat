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
const logger = log4js_1.getLogger();
class ApiWebsocket {
    constructor() { }
    initialize(appserver) {
        return __awaiter(this, void 0, void 0, function* () {
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
            appserver.on('upgrade', function upgrade(request, socket, head) {
                const pathname = url.parse(request.url).pathname;
                if (pathname === '/api/websocket') {
                    wss.handleUpgrade(request, socket, head, function done(ws) {
                        wss.emit('connection', ws, request);
                    });
                }
                else {
                    socket.destroy();
                }
            });
            return this;
        });
    }
}
exports.ApiWebsocket = ApiWebsocket;
//# sourceMappingURL=api-websocket.js.map