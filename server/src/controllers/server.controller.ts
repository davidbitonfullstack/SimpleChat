import express = require('express');
import { getLogger } from 'log4js';
import { DataAccess } from '../data-access/data-access';

const logger = getLogger();
export const router = express.Router();

export class Controller {
  dal: DataAccess;

  constructor(sequelize) {
    logger.info(`Controller constructor`);

    return this.init(sequelize) as any;
  }

  async init(sequelize) {
    this.dal = await new DataAccess();
    await this.dal.initialize(sequelize);

    return this;
  }

  public initialize = async (router: express.Router) => {
    logger.info(`Initializing UserProfileController with router`);
    router.get('/', this.getAll.bind(this));
    router.post('/', this.addMessage.bind(this));
  };

  // GET
  getAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.info('Controller getAll called');

    try {
      const data = await this.dal.getAll();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  };

  // POST
  async addMessage(req: express.Request, res: express.Response, next: express.NextFunction) {
    logger.info('Controller addMessage called');
    const message = req.body;

    try {
      const data = await this.dal.addMessage(message);

      return res.json(data);
    } catch (err) {
      next(err);
    }
  }
}
