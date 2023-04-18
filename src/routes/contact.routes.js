const express = require('express');
const { listContactsByUserId, createNewContact, updateContact, deleteContact } = require('../controllers/contactController');
const { validatePhone, validateName, validateEmail, validateEmailIsInUseByOtherContact } = require('../middlewares/validation.contacts');
const validateToken = require('../middlewares/validate.jwt');

const contactRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - nome
 *         - telefone
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the contact
 *         nome:
 *           type: string
 *           description: The name of your contact
 *         telefone:
 *           type: integer
 *           description: The contact number
 *         email:
 *           type: string
 *           description: The contact email
 *       example:
 *         id: 2
 *         name: Bianca
 *         telefone: 5547992173507
 *         email: bianca@gmail.com
 */
contactRouter.get('/list-contacts', validateToken, listContactsByUserId);
contactRouter.post('/register', validateToken, validateName, validatePhone, validateEmail, validateEmailIsInUseByOtherContact, createNewContact);
contactRouter.put('/update', validateToken, validateName, validatePhone, validateEmail, validateEmailIsInUseByOtherContact, updateContact);
contactRouter.delete('/:id', validateToken, deleteContact);

module.exports = contactRouter;