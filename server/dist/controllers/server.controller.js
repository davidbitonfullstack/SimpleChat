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
exports.Controller = exports.router = void 0;
const express = require("express");
const log4js_1 = require("log4js");
const data_access_1 = require("../data-access/data-access");
const logger = log4js_1.getLogger();
exports.router = express.Router();
class Controller {
    constructor(sequelize) {
        this.initialize = (router) => __awaiter(this, void 0, void 0, function* () {
            logger.info(`Initializing Controller with router`);
            router.get('/', this.getAll.bind(this));
            router.post('/', this.addMessage.bind(this));
        });
        // GET
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            logger.info('Controller getAll called');
            try {
                const data = yield this.dal.getAll();
                return res.json(data);
            }
            catch (err) {
                next(err);
            }
        });
        logger.info(`Controller constructor`);
        return this.init(sequelize);
    }
    init(sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.dal = yield new data_access_1.DataAccess();
            yield this.dal.initialize(sequelize);
            return this;
        });
    }
    // POST
    addMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('Controller addMessage called');
            const message = req.body;
            try {
                const data = yield this.dal.addMessage(message);
                return res.json(data);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.Controller = Controller;
//# sourceMappingURL=server.controller.js.map