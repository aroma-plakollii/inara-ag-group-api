import { Request, Response } from "express"
import { UserGetByEmail } from "../data/DataAccessLayer/UserDAL";
import bcryp from 'bcrypt';
import { createSecretToken } from "../data/helpers/CreateSecretToke";

export const Login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try{
        if(!email || !password)
            return res.send({
                status: 400,
                message: "All fields are required!"
        })

        const user = await UserGetByEmail(email);

        if(!user){
            return res.send({
                status: 400,
                message: "Incorrect email or password."
            });
        }

        const isCorrectPassword = await bcryp.compare(password, user.password);

        if(!isCorrectPassword){
            return res.send({
                status: 400,
                message: "Incorrect email or password."
            });
        }

        const token = createSecretToken(user.idUser);

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
    catch(error){
        res.status(500).json({ isAuthenticated: false, message: 'Internal Server Error', error });
    }
}

export const Logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');

        return res.status(200).json({
            isAuthenticated: false,
            message: 'Successfully logged out',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}
