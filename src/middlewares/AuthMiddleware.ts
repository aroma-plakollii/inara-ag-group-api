import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from "../data/Entity/Users";
import { AppDataSource } from "../db/appDataSource";

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {    
    const hederToken = req.cookies.token || req.header('Authorization');
    const token = hederToken?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded: any  = jwt.verify(token, process.env.TOKEN_KEY || '');

        const userId = decoded.id;
        const userRepository = AppDataSource.getRepository(User)

        const user: User | any = await userRepository.findOneBy({idUser: userId})
        
        if(!user){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        next();
    }
    catch(error) {
        return res.status(500).json({ message: error });
    }
};