import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

interface JwtPayload {
    id:number;
}

declare module 'express-serve-static-core' {
    interface Request {
        userId: number;
    }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        console.log("Conteúdo decodificado do token JWT:", decoded);

        if (decoded.id) {
            req.userId = decoded.id;
            console.log("User ID extraído do token JWT:", req.userId);
        } else {
            console.error("Erro: `userId` ausente no payload do token JWT.");
            return res.status(401).json({ error: '`userId` ausente no token JWT.' });
        }

        next();
    } catch (error) {
        console.error("Erro ao decodificar token JWT:", error);
        res.status(401).json({ error: 'Token inválido' });
    }
};

export default authenticate;
