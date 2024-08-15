"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetEmptyModel = exports.UserGetByEmail = exports.UserDelete = exports.UserUpdate = exports.UserCreate = exports.UserGetByIdUserType = exports.UserGetAllPaged = exports.UserGetAll = exports.UserGetByPrimaryKey = void 0;
const appDataSource_1 = require("../../db/appDataSource");
const Users_1 = require("../Entity/Users");
const UserRole_1 = __importDefault(require("../helpers/UserRole"));
const UserGetByPrimaryKey = async (idUser) => {
    const userRepository = appDataSource_1.AppDataSource.getRepository(Users_1.User);
    // return await userRepository.findOneBy({ idUser });
    return await userRepository.findOne({ where: { idUser } });
};
exports.UserGetByPrimaryKey = UserGetByPrimaryKey;
const UserGetAll = async () => {
    const userRepository = appDataSource_1.AppDataSource.getRepository(Users_1.User);
    return await userRepository.find();
};
exports.UserGetAll = UserGetAll;
const UserGetAllPaged = async (page) => {
    const perPage = 20;
    const userRepository = appDataSource_1.AppDataSource.getRepository(Users_1.User);
    const offset = (page - 1) * perPage;
    const users = await userRepository.find({
        take: perPage,
        skip: offset
    });
    const totalCount = await userRepository.count();
    const totalPages = Math.ceil(totalCount / perPage);
    return { users, totalPages };
};
exports.UserGetAllPaged = UserGetAllPaged;
const UserGetByIdUserType = (idUserType) => {
    return ['get user byIdUserType'];
};
exports.UserGetByIdUserType = UserGetByIdUserType;
const UserCreate = async (userData) => {
    const userRepository = appDataSource_1.AppDataSource.getRepository(Users_1.User);
    userData.createdAt = new Date();
    userData.updatedAt = null;
    const user = userRepository.create(userData);
    return await userRepository.save(user);
};
exports.UserCreate = UserCreate;
const UserUpdate = async (idUser, userData) => {
    const userRepository = appDataSource_1.AppDataSource.getRepository(Users_1.User);
    userData.updatedAt = new Date();
    const user = await userRepository.findOneBy({ idUser });
    if (user) {
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.email = userData.email;
        user.userRole = userData.userRole;
        user.password = userData.password;
        return await userRepository.save(user);
    }
};
exports.UserUpdate = UserUpdate;
const UserDelete = async (idUser) => {
    const userRepository = appDataSource_1.AppDataSource.getRepository(Users_1.User);
    const user = await userRepository.findOneBy({ idUser });
    if (user) {
        return await userRepository.remove(user);
    }
};
exports.UserDelete = UserDelete;
const UserGetByEmail = async (email) => {
    const userRepository = appDataSource_1.AppDataSource.getRepository(Users_1.User);
    return await userRepository.findOne({
        where: {
            email
        },
    });
};
exports.UserGetByEmail = UserGetByEmail;
const UserGetEmptyModel = () => {
    const userRepository = appDataSource_1.AppDataSource.getRepository(Users_1.User);
    const user = userRepository.create();
    user.firstName = '';
    user.lastName = '';
    user.email = '';
    user.password = '';
    user.userRole = UserRole_1.default.AGENT;
    return user;
};
exports.UserGetEmptyModel = UserGetEmptyModel;
// Validations
//# sourceMappingURL=UserDAL.js.map