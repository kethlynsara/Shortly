import { authService } from '../services/authService.js';

export async function signUp(req, res) {
    const { name, email, password } = req.body;    
    const result = await authService.signUp({name, email, password})
    
    if (result) {
        return res.sendStatus(201);
    } else {
        return res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const { user } = res.locals;

    const token = await authService.signIn(user.id);

    if (token) {
        return res.send(token);
    } else {
        return res.sendStatus(500);
    }
}