import { log } from 'node:console';
import { Sequelize,Options } from 'sequelize'

require("dotenv").config();

const options: Options = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT as unknown as number,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    // sync: { alter: true,logging:true },
    // logging: true, 
    logging: console.log,
};

const sequelize = new Sequelize(options);


export default sequelize;