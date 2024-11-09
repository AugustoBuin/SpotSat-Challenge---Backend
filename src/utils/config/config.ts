import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"; 

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  models: [__dirname + '/../models'],
  // logging: false,
});

export default sequelize;
