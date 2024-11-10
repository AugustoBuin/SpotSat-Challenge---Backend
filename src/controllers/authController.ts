import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await userService.getUserByName(username);

        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao autenticar usuário' });
    }
};

export default {
    login,
};
