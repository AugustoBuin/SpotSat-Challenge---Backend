import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import userService from '../services/userService';

const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await userService.createUser({ username, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

const getAllUsers = async (_: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter usuários' });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter usuário' });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = password ? await bcryptjs.hash(password, 10) : undefined;
        const updatedUser = await userService.updateUser(req.params.id, { username, password: hashedPassword });

        if (!updatedUser) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
