require('dotenv').config();

module.exports = {
    development: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        jwt_secret: process.env.JWT_SECRET,
        dialect: 'postgres',
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false,
        //     },
        // },
        synchronize: true,
    },
    production: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        jwt_secret: process.env.JWT_SECRET,
        dialect: 'postgres',
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false,
        //     },
        // },
    },
};