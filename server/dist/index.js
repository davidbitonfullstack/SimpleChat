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
// initializing logger first
const log4js_1 = require("log4js");
const logger = log4js_1.getLogger();
logger.level = 'debug';
const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
// import { Server } from 'http';
const http_1 = require("http");
const cors_1 = require("./utils/cors");
const app = express();
const port = process.env.PORT || 8095;
const server = http_1.createServer(app);
const router = express.Router();
app.use(cors_1.corsHandler);
app.use(bodyParser.json());
app.use('/api/admin', router);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger.info(`app started on port ${port}`);
    // const webSocket = new ApiWebsocket();
    // await webSocket.initialize(server);
}));
//# sourceMappingURL=index.js.map