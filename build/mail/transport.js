"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transport = void 0;
const nodemailer = require('nodemailer');
exports.transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});
//# sourceMappingURL=transport.js.map