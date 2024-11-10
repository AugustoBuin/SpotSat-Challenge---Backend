import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "../models/User";
import Polygon from "../models/Polygon";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  models: [User, Polygon],
  // logging: false,
});

export default sequelize;
