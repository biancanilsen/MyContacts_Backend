const contactService = require('../services/contactService');
const defaultApiReturn = require('../utils/defaultApiReturn');

const listContactsByUserId = async (req, res) => {
  try {
    const { id } = req.tokenData;

    const response = await contactService.listContactsByUserId({ id });

    return res.status(200).json(defaultApiReturn({ apiResponse: response }));
  }
  catch (e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

const createNewContact = async (req, res) => {
  try {
    const { nome, telefone, email } = req.body;
    const { id } = req.tokenData;

    const response = await contactService.createNewContact({ nome, telefone, email, userId: id });

    if (!response) {
      return res.status(200).json(defaultApiReturn({ error: { message: 'Este contato já existe' } }));
    }

    return res.status(201).json(defaultApiReturn({}));
  }
  catch (e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

const updateContact = async (req, res) => {
  try {
    const { id, nome, telefone, email } = req.body;
    const response = await contactService.updateContact({ id, nome, telefone, email });

    if (!response) {
      return res.status(200).json(defaultApiReturn({ error: { message: 'Este contato não existe' } }));
    }

    return res.status(200).json(defaultApiReturn({}));
  }
  catch (e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente' } }));
  }
}

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.tokenData.id;

    const response = await contactService.deleteContact({ id, userId });

    if (!response) {
      return res.status(200).json(defaultApiReturn({ error: { message: 'Este contato não existe' } }));
    }

    return res.status(200).json(defaultApiReturn({}));
  }
  catch (e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

module.exports = {
  listContactsByUserId,
  createNewContact,
  updateContact,
  deleteContact,
};