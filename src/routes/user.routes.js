const express = require('express');
const UserController = require('../controllers/userController');
const LoginController = require('../controllers/loginController');
const { validateEmail, validatePassword } = require('../middlewares/validation.login');

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The name of your contact
 *         password:
 *           type: string
 *           description: The contact number
 *       example:
 *         id: 2
 *         email: Bianca@gmail.com
 *         password: 5547992173507
 * 
 * 
 */




userRouter.post('/register', validateEmail, validatePassword, UserController);
userRouter.post('/login', validateEmail, validatePassword, LoginController);

module.exports = userRouter;