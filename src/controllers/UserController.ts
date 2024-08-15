import { Request, Response } from "express";
import { UserCreate, UserGetAll, UserUpdate, UserGetByEmail, UserGetByPrimaryKey, UserGetEmptyModel, UserDelete, UserGetAllPaged } from "../data/DataAccessLayer/UserDAL";
import bcrypt from 'bcrypt';
import { User } from "../data/Entity/Users";
import { AppDataSource } from "../db/appDataSource";
import { validate } from 'class-validator';
import ActionType from "../data/helpers/ActionType";
import UserRole from "../data/helpers/UserRole";
import { createSecretToken } from "../data/helpers/CreateSecretToke";
import { transport } from "../mail/transport";

export const getSingleUser = async (req: any, res: any) => {
    const { idUser } = req.params;
    const user = await UserGetByPrimaryKey(idUser);

    return res.status(200).send(user);
};

export const getAllUsers = async (req: any, res: any) => {
    const users = await UserGetAll();

    return res.status(200).send({
        users
    });
};

export const getAllUsersPaged = async (req: any, res: any) => {
    const { page } = req.params;
    const { users, totalPages } = await UserGetAllPaged(page);

    return res.status(200).send({
        users,
        totalPages
    });
};

export const registerUser = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password, userRole} = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
        firstName,
        lastName, 
        email,
        password: hashedPassword,
        userRole
    } as User;

    const userRepository = AppDataSource.getRepository(User);

    try {
        const existingUser = await UserGetByEmail(email);

        if(existingUser){
            return res.send({
                success: true,
                status: 409, 
                message: "User already exists", 
            });
        }

        const user = userRepository.create(userData);
        // const validationErrors = await validate(user, { groups: [ActionType.CREATE]});
        const validationErrors = await validate(user);

        if (validationErrors.length > 0) {
            return res.status(400).send({
                status: 400,
                message: 'Validation failed',
                errors: validationErrors
            });
        }

        const newUser = await UserCreate(user);
        
        return res.status(200).send({
            status: 200,
            message: 'User registration successful',
            user: newUser
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            status: 500,
            message: 'An error occurred during user registration'
        });
    }
};

export const updateUser = async (req: any, res: any) => {
    const {firstName, lastName, email,password, userRole} = req.body;
    const { idUser } = req.params;
    const saltRounds = 10;

    try {
        let hashedPassword = password;
        const existingUser = await UserGetByPrimaryKey(idUser);

        if (existingUser) {
            const isSamePassword = password === existingUser.password;
            
            if (!isSamePassword) {
            hashedPassword = await bcrypt.hash(password, saltRounds);
            }
        }

        const userData = {
            firstName,
            lastName, 
            email,
            password: hashedPassword,
            userRole
        } as User;
          
        const user = await UserUpdate(idUser, userData);
        
        return res.status(200).send({
            status: 200,
            message: 'User update successful',
            user: user
        });
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during user update'
        });
    }
}

export const getCreateModel = async (req: Request, res: Response) => {
    const userRoles = UserRole;
    return res.status(200).send({
        operation: ActionType.UPDATE,
        userRoles: userRoles
    });
}

export const getUpdateModel = async (req: Request, res: Response) => {  
    const userRoles = UserRole;
    return res.status(200).send({
        operation: ActionType.UPDATE,
        userRoles: userRoles
    });
}

export const deleteUser = async (req: any, res: any) => {
    const { idUser } = req.params;

    try{
        const user = await UserDelete(idUser);

        return res.status(200).send({
            status: 200,
            message: 'User remove successful',
            user: user
        });
    }catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during user removal'
        });
    }
};

export const verifyEmail = async (req: any, res: any) => {
    const { email } = req.body;

    try{
        const existingUser = await UserGetByEmail(email);

        if(existingUser){
            const token = createSecretToken(existingUser.idUser);
            const passwordResetLink = `${process.env.WEB_URL}/reset-password/${token}/${existingUser.idUser}`;

            const mailOptions = {
                from: '"Inara AG Group" <inaraaggroup@inaraaggroup.com>', // Make sure the sender address is correctly formatted
                to: existingUser.email, // Directly use the email from the user object
                subject: 'Ndryshimi i fjalekalimit', // Subject line
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
            }

            transport.sendMail(mailOptions, function(err: any, info: any) {
                if (err) {
                    console.error('Error sending email:', err);
                } else {
                    return res.send({
                        'Email sent' : info
                    })
                }
            });
        }else {
            return res.status(404).send({
                status: 404,
                message: 'User not found'
            });
        }
    }catch(error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during mail delivery'
        });
    }
}

export const resetPassword = async (req: any, res: any) => {
    const { idUser, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    try{
        const existingUser = await UserGetByPrimaryKey(idUser);

        if(existingUser){

            const userData = {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName, 
                email: existingUser.email,
                password: hashedPassword,
                userRole: existingUser.userRole
            } as User;
           
            const user = await UserUpdate(idUser, userData);

            return res.status(200).send({
                status: 200,
                message: 'Password update successful',
                user: user,
            });
        }
    }catch(error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during mail delivery'
        });
    }
}

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