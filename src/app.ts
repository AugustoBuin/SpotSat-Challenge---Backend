import express, { Application } from 'express';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './utils/config/config';
// import routes from './routes'; // import das rotas 
// import User from './controller/User'; // import do controle de usuário 

dotenv.config();

// Configuração do express 
const createApp = (): Application => {
    const app = express();

    app.use(cors({
        origin: 'http://localhost:3001',
        credentials: false, // colocar true depois (GBBC)
    }));

    app.use(express.json()); // Parsing JSON
    app.use('/', routes);

    return app;
};

// Validação de usuário padrão
const defaultUser = async () => {
    const defaultUser = process.env.DEFAULT_USER || 'admin';
    const defaultPassword = process.env.DEFAULT_PASSWORD || 'admin';

    try {
        // Busca se já existe o usuário padrão
        const userExists = await User.findUserByName({ where: { username: defaultUser } });

        // Cria um usuário padrão
        if (!userExists) {
            // Criptografa a senha antes de salvar
            const hashedPassword = await bcryptjs.hash(defaultPassword, 10);
            await User.createUser({ username: defaultUser, password: hashedPassword });
            console.log(`Usuário padrão chamado '${defaultUser}' criado com sucesso!`);
        } else {
            console.log(`Usuário padrão chamado '${defaultUser}' já existe!`);
        }
    } catch (error) {
        console.error('Erro ao validar o usuário padrão:', error);
    }
};

// Conectar ao BD
const connectDB = async () => {
    try {
        await sequelize.sync();
        console.log('Conectado ao banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1);
    }
};

export { createApp, connectDB, defaultUser };
