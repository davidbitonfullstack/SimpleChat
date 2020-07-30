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
exports.DataAccess = void 0;
const sequelize_1 = require("sequelize");
class Messages extends sequelize_1.Model {
}
const log4js_1 = require("log4js");
const logger = log4js_1.getLogger();
class DataAccess {
    constructor() { }
    initialize(sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`Initializing DataAccess with sequelize`);
            sequelize
                .authenticate()
                .then(() => {
                console.log('Connection has been established successfully.');
            })
                .catch((err) => {
                console.error('Unable to connect to the database:', err);
            });
            Messages.init({
                id: {
                    type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                user: {
                    type: new sequelize_1.DataTypes.STRING(128),
                    allowNull: false,
                },
                message: {
                    type: new sequelize_1.DataTypes.STRING(128),
                    allowNull: false,
                },
            }, {
                tableName: 'messages',
                sequelize,
            });
            return this;
        });
    }
    // GET
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`DataAccess getAll`);
            try {
                return yield Messages.findOne({ order: [['id', 'DESC']] });
            }
            catch (err) {
                const msg = `error while adding message: ${err}`;
                throw new Error(msg);
            }
        });
    }
    // POST
    addMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`DataAccess addMessage`);
            try {
                const createdMessage = yield Messages.create(message);
                return createdMessage;
            }
            catch (err) {
                const msg = `error while adding message: ${err}`;
                throw new Error(msg);
            }
        });
    }
}
exports.DataAccess = DataAccess;
//# sourceMappingURL=data-access.js.map