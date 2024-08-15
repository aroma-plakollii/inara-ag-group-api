"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Login = void 0;
const UserDAL_1 = require("../data/DataAccessLayer/UserDAL");
const bcrypt_1 = __importDefault(require("bcrypt"));
const CreateSecretToke_1 = require("../data/helpers/CreateSecretToke");
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.send({
                status: 400,
                message: "All fields are required!"
            });
        const user = await (0, UserDAL_1.UserGetByEmail)(email);
        if (!user) {
            return res.send({
                status: 400,
                message: "Incorrect email or password."
            });
        }
        const isCorrectPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.send({
                status: 400,
                message: "Incorrect email or password."
            });
        }
        const token = (0, CreateSecretToke_1.createSecretToken)(user.idUser);
        res.cookie('token', token, {
            httpOnly: false,
        });
        return res.status(201).json({
            isAuthenticated: true,
            user: {
                idUser: user.idUser,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userRole: user.userRole
            },
            token,
        });
    }
    catch (error) {
        res.status(500).json({ isAuthenticated: false, message: 'Internal Server Error', error });
    }
};
exports.Login = Login;
const Logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            isAuthenticated: false,
            message: 'Successfully logged out',
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};
exports.Logout = Logout;
//# sourceMappingURL=AuthController.js.map