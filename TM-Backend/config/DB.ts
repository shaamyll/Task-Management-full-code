import { Sequelize,Options } from 'sequelize'

require("dotenv").config();

const options: Options = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT as unknown as number,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    logging: console.log,
};

const sequelize = new Sequelize(options);



export default sequelize;


// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize({
//   username: process.env.DB_USERNAME!,
//   password: process.env.DB_PASSWORD!,
//   database: process.env.DB_NAME!,
//   host: process.env.DB_HOST!,
//   port: parseInt(process.env.DB_PORT || '5432'),
//   dialect: 'postgres',
//   logging: false,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // needed for Render or Railway
//     },
//   },
// });

// export default sequelize;
