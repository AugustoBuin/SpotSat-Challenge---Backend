require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT ||5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: false,
        }
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST || "localhost",
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: false,
        }
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST || "localhost",
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: true,
        }
    }
};
