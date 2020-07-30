import { Sequelize, Model, DataTypes } from 'sequelize';

class Messages extends Model {
  public id!: number;
  public user!: string;
  public message!: string;
}

import { getLogger } from 'log4js';

const logger = getLogger();

export class DataAccess {
  constructor() {}

  public async initialize(sequelize) {
    logger.info(`Initializing DataAccess with sequelize`);

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });

    Messages.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        user: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        message: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
      },
      {
        tableName: 'messages',
        sequelize,
      }
    );

    return this;
  }

  // GET
  public async getAll() {
    logger.info(`DataAccess getAll`);

    try {
      return await Messages.findOne({ order: [['id', 'DESC']] });
    } catch (err) {
      const msg = `error while adding message: ${err}`;
      throw new Error(msg);
    }
  }

  // POST
  public async addMessage(message) {
    logger.info(`DataAccess addMessage`);

    try {
      const createdMessage = await Messages.create(message);

      return createdMessage;
    } catch (err) {
      const msg = `error while adding message: ${err}`;
      throw new Error(msg);
    }
  }
}
