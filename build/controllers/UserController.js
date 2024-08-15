"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyEmail = exports.deleteUser = exports.getUpdateModel = exports.getCreateModel = exports.updateUser = exports.registerUser = exports.getAllUsersPaged = exports.getAllUsers = exports.getSingleUser = void 0;
const UserDAL_1 = require("../data/DataAccessLayer/UserDAL");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../data/Entity/Users");
const appDataSource_1 = require("../db/appDataSource");
const class_validator_1 = require("class-validator");
const ActionType_1 = __importDefault(require("../data/helpers/ActionType"));
const UserRole_1 = __importDefault(require("../data/helpers/UserRole"));
const CreateSecretToke_1 = require("../data/helpers/CreateSecretToke");
const transport_1 = require("../mail/transport");
const getSingleUser = async (req, res) => {
    const { idUser } = req.params;
    const user = await (0, UserDAL_1.UserGetByPrimaryKey)(idUser);
    return res.status(200).send(user);
};
exports.getSingleUser = getSingleUser;
const getAllUsers = async (req, res) => {
    const users = await (0, UserDAL_1.UserGetAll)();
    return res.status(200).send({
        users
    });
};
exports.getAllUsers = getAllUsers;
const getAllUsersPaged = async (req, res) => {
    const { page } = req.params;
    const { users, totalPages } = await (0, UserDAL_1.UserGetAllPaged)(page);
    return res.status(200).send({
        users,
        totalPages
    });
};
exports.getAllUsersPaged = getAllUsersPaged;
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, userRole } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
    const userData = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userRole
    };
    const userRepository = appDataSource_1.AppDataSource.getRepository(Users_1.User);
    try {
        const existingUser = await (0, UserDAL_1.UserGetByEmail)(email);
        if (existingUser) {
            return res.send({
                success: true,
                status: 409,
                message: "User already exists",
            });
        }
        const user = userRepository.create(userData);
        // const validationErrors = await validate(user, { groups: [ActionType.CREATE]});
        const validationErrors = await (0, class_validator_1.validate)(user);
        if (validationErrors.length > 0) {
            return res.status(400).send({
                status: 400,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        const newUser = await (0, UserDAL_1.UserCreate)(user);
        return res.status(200).send({
            status: 200,
            message: 'User registration successful',
            user: newUser
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during user registration'
        });
    }
};
exports.registerUser = registerUser;
const updateUser = async (req, res) => {
    const { firstName, lastName, email, password, userRole } = req.body;
    const { idUser } = req.params;
    const saltRounds = 10;
    try {
        let hashedPassword = password;
        const existingUser = await (0, UserDAL_1.UserGetByPrimaryKey)(idUser);
        if (existingUser) {
            const isSamePassword = password === existingUser.password;
            if (!isSamePassword) {
                hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
            }
        }
        const userData = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userRole
        };
        const user = await (0, UserDAL_1.UserUpdate)(idUser, userData);
        return res.status(200).send({
            status: 200,
            message: 'User update successful',
            user: user
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during user update'
        });
    }
};
exports.updateUser = updateUser;
const getCreateModel = async (req, res) => {
    const userRoles = UserRole_1.default;
    return res.status(200).send({
        operation: ActionType_1.default.UPDATE,
        userRoles: userRoles
    });
};
exports.getCreateModel = getCreateModel;
const getUpdateModel = async (req, res) => {
    const userRoles = UserRole_1.default;
    return res.status(200).send({
        operation: ActionType_1.default.UPDATE,
        userRoles: userRoles
    });
};
exports.getUpdateModel = getUpdateModel;
const deleteUser = async (req, res) => {
    const { idUser } = req.params;
    try {
        const user = await (0, UserDAL_1.UserDelete)(idUser);
        return res.status(200).send({
            status: 200,
            message: 'User remove successful',
            user: user
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during user removal'
        });
    }
};
exports.deleteUser = deleteUser;
const verifyEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await (0, UserDAL_1.UserGetByEmail)(email);
        if (existingUser) {
            const token = (0, CreateSecretToke_1.createSecretToken)(existingUser.idUser);
            const passwordResetLink = `${process.env.WEB_URL}/reset-password/${token}/${existingUser.idUser}`;
            const mailOptions = {
                from: '"Inara AG Group" <inaraaggroup@inaraaggroup.com>',
                to: existingUser.email,
                subject: 'Ndryshimi i fjalekalimit',
                html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Password Reset</title>
                    </head>
                    <body style="background-color: #edf2f7; display: flex; justify-content: center; font-family: Arial, Helvetica, sans-serif;">
                        <div style="width: 50%;">
                            <div style="text-align: center; padding: 20px;">
                                <img src="http://localhost:3000/assets/inara-logo-2.png" alt="logo" style="width: 200px;">
                            </div>
                            <div style="background-color: white; padding: 30px; color: #3d4852;">
                                <b style="font-size: 18px;">Ndryshimi i fjalëkalimit</b>
                                <p style="color: #718096;">Ju keni kërkuar të ndryshoni fjalëkalimin për llogarinë tuaj. Ju lutemi, klikoni butonin më poshtë për ta ndryshuar atë:</p>
                                <div style="text-align: center; padding-top: 17px;">
                                    <a href="${passwordResetLink}" style="padding: 10px 20px; color: white; background-color: #ffdd00; text-decoration: none; border-radius: 6px;">Kliko këtu</a>
                                </div>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            };
            transport_1.transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.error('Error sending email:', err);
                }
                else {
                    return res.send({
                        'Email sent': info
                    });
                }
            });
        }
        else {
            return res.status(404).send({
                status: 404,
                message: 'User not found'
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during mail delivery'
        });
    }
};
exports.verifyEmail = verifyEmail;
const resetPassword = async (req, res) => {
    const { idUser, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
    try {
        const existingUser = await (0, UserDAL_1.UserGetByPrimaryKey)(idUser);
        if (existingUser) {
            const userData = {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                password: hashedPassword,
                userRole: existingUser.userRole
            };
            const user = await (0, UserDAL_1.UserUpdate)(idUser, userData);
            return res.status(200).send({
                status: 200,
                message: 'Password update successful',
                user: user,
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during mail delivery'
        });
    }
};
exports.resetPassword = resetPassword;
// export const registerUser = async (req: Request, res: Response) => {
//     try {
// const userRepository = AppDataSource.getRepository(User);
// const user = userRepository.create(req.body);
// // await validateOrReject(user, { groups: ['registration'] });
// // await validateOrReject(user);
// await userRepository.save(user);
// return res.send({
//   status: 200,
//   message: 'User registration successful',
//   user: user
// });
//       } catch (errors) {
//         console.error(errors);
// return res.status(400).send({
//   status: 400,
//   message: 'Validation failed',
//   errors: errors
// });
//     }
// //     const userRepository = AppDataSource.getRepository(User);
// //     const user = userRepository.create(req.body);
// //     const isValid = validateOrReject(user);
// //     //await userRepository.save(user)
// //    console.log(isValid)
// //    console.log(user)
// //    return res.send({
// //         status: 400,
// //         message: 'success',
// //         v: isValid,
// //         user: user
// //     });
//     // return await userRepository.save(user)
//     // const user = new User(req.body);
//     // try{
//     //     const {firstName, lastName, email, password, idUserType} = req.body;
//     //     const existingUser = await UserGetByEmail(email);
//     //     if(existingUser){
//     //         return res.send({ message: "User already exists", existingUser });
//     //     }
//     //     const saltRounds = 10;
//     //     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     //     const userData = {
//     //         firstName, lastName, email, password: hashedPassword, idUserType
//     //     }
//     //     const user = await UserCreate(userData)
//         // return res.send({
//         //     status: 400,
//         //     message: 'success',
//         //     user: user
//         // });
//     // } catch(error){
//     //     res.status(500).json({ message: 'Internal Server Error', error });
//     // }
// };
//# sourceMappingURL=UserController.js.map