const { Contact } = require('../database/models');
const defaultApiReturn = require('../utils/defaultApiReturn');
const validator = require('validator');

const validatePhone = async (req, res, next) => {
  try {
    const { id, telefone } = req.body;

    if (telefone.toString().trim().length !== 11) {
      return res.status(200).json(defaultApiReturn({ error: { message: 'Número de telefone inválido.' } }));
    }

    const contactWithSamePhone = await Contact.findOne({ where: { telefone, isActive: true } });

    if (contactWithSamePhone && contactWithSamePhone.dataValues.id !== id) {
      return res.status(200).json(defaultApiReturn({ error: { message: `Este telefone está associado ao contato: ${contactWithSamePhone.dataValues.nome}.` } }));
    }

    next();
  } catch (e) {
    console.error(e.message);

    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

const validateName = async (req, res, next) => {
  try {
    const { id, nome } = req.body;

    if (!nome || nome !== undefined && nome.length <= 0) {
      return res.status(200).json(defaultApiReturn({ error: { message: 'O campo Nome não pode estar vazio.' } }));
    }

    const contactWithSameName = await Contact.findOne({ where: { nome, isActive: true } });

    if (contactWithSameName && contactWithSameName.dataValues.id !== id) {
      return res.status(200).json(defaultApiReturn({ error: { message: `Este Nome já está em uso por um dos seus contatos.` } }));
    }

    next();
  } catch (e) {
    console.error(e.message);

    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

const validateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || email !== undefined && email.length <= 0) {
      return res.status(200).json(defaultApiReturn({ error: { message: 'O campo Email não pode estar vazio.' } }));
    }

    if (!validator.isEmail(email)) {
      return res.status(200).json(defaultApiReturn({ error: { message: 'O email informado não é válido.' } }));
    }

    next();
  } catch (e) {
    console.error(e.message);

    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

const validateEmailIsInUseByOtherContact = async (req, res, next) => {
  try {
    const { id, email } = req.body;

    const contactWithSameEmail = await Contact.findOne({ where: { email, isActive: true } });

    if (contactWithSameEmail && contactWithSameEmail.dataValues.id !== id) {
      return res.status(200).json(defaultApiReturn({ error: { message: `Este E-mail está associado ao contato: ${contactWithSameEmail.dataValues.nome}.` } }));
    }

    next();
  } catch (e) {
    console.error(e.message);

    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
};

module.exports = {
  validatePhone,
  validateName,
  validateEmail,
  validateEmailIsInUseByOtherContact
}
