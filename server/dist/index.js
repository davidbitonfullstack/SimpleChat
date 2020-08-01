"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// initializing logger first
const log4js_1 = require("log4js");
const logger = log4js_1.getLogger();
logger.level = 'debug';
const express = require("express");
const bodyParser = require("body-parser");
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const cors_1 = require("./utils/cors");
const sequelize_1 = require("sequelize");
const fs_1 = require("fs");
const path = require("path");
// const sequelize = new Sequelize('simple_chat', 'root', 'root', {
//   host: process.env.DATABASE_URL || '127.0.0.1',
//   dialect: 'mysql',
//   define: {
//     timestamps: false,
//   },
// });
//TODO: in real app export to config file and use process.env
const sequelize = new sequelize_1.Sequelize('un5daxmcwi4eieeb', 'vlu8q30yl5ta16kv', 'd7e733oqgwh5dviy', {
    host: 'nnmeqdrilkem9ked.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
        timestamps: false,
    },
});
const httpApp = express();
const app = express();
const httpsOptions = {
    key: fs_1.readFileSync('cert/key.pem'),
    cert: fs_1.readFileSync(path.join('cert', 'cert.pem')),
};
httpApp.set('port', process.env.PORT || 8095);
httpApp.get('*', function (req, res, next) {
    res.redirect('https://' + req.headers.host + '/' + req.path);
});
app.set('port', process.env.PORT || 443);
// const app = express();
// const port = process.env.PORT || 8095;
// const server = createServer(app);
const router = express.Router();
app.use(cors_1.corsHandler);
app.use(bodyParser.json());
app.use('/api/messages', router);
http.createServer(httpApp).listen(httpApp.get('port'), function () {
    console.log('Express HTTP server listening on port ' + httpApp.get('port'));
});
https.createServer(httpsOptions, app).listen(app.get('port'), function () {
    console.log('Express HTTPS server listening on port ' + app.get('port'));
});
// server.listen(port, async () => {
//   logger.info(`app started on port ${port}`);
//   const websocket = await new ApiWebsocket();
//   await websocket.initialize(server);
//   const controller = await new Controller(sequelize);
//   await controller.initialize(router);
// });
//# sourceMappingURL=index.js.map