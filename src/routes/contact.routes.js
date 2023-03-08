const express = require('express');
const { listContactsByUserId, createNewContact, updateContact, deleteContact }  = require('../controllers/contactController');
const { validatePhone, validateName, validateEmail, validateEmailIsInUseByOtherContact } = require('../middlewares/validation.contacts');
const validateToken = require('../middlewares/validate.jwt');

const contactRouter = express.Router();

contactRouter.get('/list-contacts', validateToken, listContactsByUserId);
contactRouter.post('/register', validateToken, validateName, validatePhone, validateEmail, validateEmailIsInUseByOtherContact, createNewContact);
contactRouter.put('/update', validateToken, validateName, validatePhone, validateEmail, validateEmailIsInUseByOtherContact, updateContact);
contactRouter.delete('/:id', validateToken, deleteContact);

module.exports = contactRouter;