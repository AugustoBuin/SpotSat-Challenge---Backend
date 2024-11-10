import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

// Rota de autenticação de usuário admin
router.post('/login', authController.login);

export default router;
