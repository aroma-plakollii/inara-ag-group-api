"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidateEmail = exports.UserCreate = exports.createSecretToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const UserDAL_1 = require("../DataAccessLayer/UserDAL");
const createSecretToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_KEY, { expiresIn: 3 * 24 * 60 * 60 });
};
exports.createSecretToken = createSecretToken;
const UserCreate = async (userData) => {
    /**
     * Validation Rules
     *
     * 1. Validate email.
     * 2. Check if user exists: if user exists return 'User already exists!'
     */
    if (!(0, exports.UserValidateEmail)(userData.email)) {
        return {
            status: 400,
            success: true,
            message: 'Invalid email!'
        };
    }
    const user = await (0, UserDAL_1.UserGetByEmail)(userData.email);
    return user;
    // if(user){
    //     console.log(user)
    //     return {
    //         status: 400,
    //         message: 'User creatd successfully!'
    //     }
    // }
};
exports.UserCreate = UserCreate;
const UserValidateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
    return false; //regex.test(email);
};
exports.UserValidateEmail = UserValidateEmail;
//# sourceMappingURL=UserBO.js.map