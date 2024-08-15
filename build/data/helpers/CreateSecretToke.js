"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecretToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const createSecretToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_KEY, { expiresIn: 3 * 24 * 60 * 60 });
};
exports.createSecretToken = createSecretToken;
//# sourceMappingURL=CreateSecretToke.js.map