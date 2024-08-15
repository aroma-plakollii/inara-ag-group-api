"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Entity_1 = __importDefault(require("../data/Entity"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: Entity_1.default
});
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
//# sourceMappingURL=appDataSource.js.map