"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const Users_1 = require("../data/Entity/Users");
const appDataSource_1 = require("../db/appDataSource");
const isLoggedIn = async (req, res, next) => {
    const hederToken = req.cookies.token || req.header('Authorization');
    const token = hederToken?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY || '');
        const userId = decoded.id;
        const userRepository = appDataSource_1.AppDataSource.getRepository(Users_1.User);
        const user = await userRepository.findOneBy({ idUser: userId });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=AuthMiddleware.js.map