"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_json_1 = __importDefault(require("../config/config.json"));
const sequelize = new sequelize_1.Sequelize(config_json_1.default.development.database, config_json_1.default.development.username, config_json_1.default.development.password, {
    host: config_json_1.default.development.host,
    dialect: 'mysql',
});
const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize);
module.exports = db;
//# sourceMappingURL=connections.js.map