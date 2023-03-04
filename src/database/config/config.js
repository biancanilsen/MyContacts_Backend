require('dotenv').config();

module.exports = {
    development: {
        host: process.env.REMOTE_HOST,
        username: process.env.REMOTE_USERNAME,
        password: process.env.REMOTE_PASSWORD,
        port: process.env.REMOTE_PORT,
        database: process.env.REMOTE_DATABASE,
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
    test: {
        host: process.env.TEST_DB_HOST,
        username: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PASS,
        port: process.env.TEST_DB_PORT,
        database: process.env.TEST_DB_NAME,
        jwt_secret: process.env.JWT_SECRET,
        dialect: 'mysql',
    }
};