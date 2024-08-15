import { DataSource } from "typeorm"
import Entities from "../data/Entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: Entities
})

// import {Dialect, Sequelize} from 'sequelize';

// export const DatabaseConfig = {
//     development: {
//       username: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       database: process.env.DB_NAME,
//       host: process.env.DB_HOST,
//       port: Number(process.env.DB_PORT),
//       dialect: 'mysql' as Dialect,
//     },
// };

// export const initialize = async () => {
//   try {
//     const sequelizeInstance = new Sequelize(DatabaseConfig.development);
//     await sequelizeInstance.authenticate();
//     console.log('Connection to the database has been established successfully.');
//     return sequelizeInstance;
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     throw error; // You can handle this error in your application as needed.
//   }
// };