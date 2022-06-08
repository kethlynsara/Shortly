import joi from 'joi';

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/[a-zA-Z][0-9]/).min(6).required(),
    confirmPassword: joi.ref('password')
});