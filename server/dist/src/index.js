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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// initializing logger first
const log4js_1 = require("log4js");
const logger = log4js_1.getLogger();
logger.level = 'debug';
const express = require("express");
const bodyParser = require("body-parser");
const http_1 = require("http");
const cors_1 = require("./utils/cors");
const api_websocket_1 = require("./controllers/api-websocket");
const sequelize_1 = require("sequelize");
const config_json_1 = __importDefault(require("../config/config.json"));
const server_controller_1 = require("./controllers/server.controller");
const sequelize = new sequelize_1.Sequelize(config_json_1.default.development.database, config_json_1.default.development.username, config_json_1.default.development.password, {
    host: config_json_1.default.development.host,
    dialect: 'mysql',
    define: {
        timestamps: false,
    },
});
const app = express();
const port = process.env.PORT || 8095;
const server = http_1.createServer(app);
const router = express.Router();
app.use(cors_1.corsHandler);
app.use(bodyParser.json());
app.use('/api/admin', router);
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger.info(`app started on port ${port}`);
    const websocket = yield new api_websocket_1.ApiWebsocket();
    yield websocket.initialize(server);
    const controller = yield new server_controller_1.Controller(sequelize);
    yield controller.initialize(router);
}));
//# sourceMappingURL=index.js.map