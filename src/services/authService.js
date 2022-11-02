import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authRepository } from '../repositories/authRepository.js';
dotenv.config();

async function encrypt(password) {
    const SALT = 10;
    const hash = bcrypt.hashSync(password, SALT);
    return hash;
}

async function signUp(userInfo) {
    const encryptedPassword = await encrypt(userInfo.password);
    try {
        await authRepository.postUser(userInfo.name, userInfo.email, encryptedPassword);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function generateToken(userId) {
    const data = { userId };
    const jwtKey = process.env.SECRET_KEY;
    const token = jwt.sign(data, jwtKey);
    return token;
}

async function signIn(userId) {
    try {
        const { rows } = await authRepository.getSession('userId', userId); 

        if (rows[0]) {
            return ({token: rows[0].token});

        } else {
            const token = await generateToken(userId);            
            await authRepository.postSession(token, userId);            
            return {token};
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const authService = {
    signUp,
    signIn
}