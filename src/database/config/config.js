require('dotenv').config();

module.exports = {
    // development: {
    //     host: process.env.REMOTE_HOST,
    //     username: process.env.REMOTE_USERNAME,
    //     password: process.env.REMOTE_PASSWORD,
    //     port: process.env.REMOTE_PORT,
    //     database: process.env.REMOTE_DATABASE,
    //     jwt_secret: process.env.JWT_SECRET,
    //     dialect: 'mysql',
    // },

    development: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.DB_NAME,
        jwt_secret: process.env.JWT_SECRET,
        dialect: 'mysql',
    },
    production: {
        host: process.env.REMOTE_HOST,
        username: process.env.REMOTE_USERNAME,
        password: process.env.REMOTE_PASSWORD,
        port: process.env.REMOTE_PORT,
        database: process.env.REMOTE_DATABASE,
        jwt_secret: process.env.JWT_SECRET,
        dialect: 'mysql',

    },
};