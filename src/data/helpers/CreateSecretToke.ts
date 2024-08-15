import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const createSecretToken = (id: number) => {
    return jwt.sign(
        {id},
        process.env.TOKEN_KEY as string,
        {expiresIn: 3 * 24 * 60 * 60}
    );
}