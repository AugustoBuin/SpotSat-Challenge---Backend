require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "polygons",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DB_SSL === "true", // Configuração opcional para SSL
    }
  },
  test: {
    username: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "polygons_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DB_SSL === "true",
    }
  }
};
