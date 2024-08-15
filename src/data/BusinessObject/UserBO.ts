import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../Entity/Users';
import { UserGetByEmail } from '../DataAccessLayer/UserDAL';
import { log } from 'console';

export const createSecretToken = (id: number) => {
    return jwt.sign(
        {id},
        process.env.TOKEN_KEY as string,
        {expiresIn: 3 * 24 * 60 * 60}
    );
}

export const UserCreate = async (userData: User) => {
    /**
     * Validation Rules
     * 
     * 1. Validate email.
     * 2. Check if user exists: if user exists return 'User already exists!'
     */

    if(!UserValidateEmail(userData.email)){
        return {
            status: 400,
            success: true,
            message: 'Invalid email!'
        }
    }

    const user = await UserGetByEmail(userData.email);

    return user;
    
    // if(user){
    //     console.log(user)
    //     return {
    //         status: 400,
    //         message: 'User creatd successfully!'
    //     }
    // }
}

export const UserValidateEmail = (email: string | undefined): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
    return false; //regex.test(email);
};

