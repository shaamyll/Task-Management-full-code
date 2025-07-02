"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv").config();
const options = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    logging: console.log,
};
const sequelize = new sequelize_1.Sequelize(options);
exports.default = sequelize;
