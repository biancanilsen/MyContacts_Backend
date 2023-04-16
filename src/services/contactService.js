const { Contact } = require('../database/models');

const listContactsByUserId = async ({ id }) => {
  try {
    const contacts = await Contact.findAll({ where: { userId: id, isActive: true }, attributes: { exclude: ['userId', 'UserId','data_cadastro', 'data_alteração', 'isActive'] } });
      if (!contacts) return null;
      return contacts;
  } catch(e) {
    console.error(e.message);
  }
}

const createNewContact = async ({ nome, telefone, email, userId }) => {
    return await Contact.create({ nome: nome, telefone: telefone, email: email, userId: userId });
  }
  
  const updateContact = async ({ id, nome, telefone, email }) => {
    const contactExist = await Contact.findOne({ where: { id } });
    if (!contactExist) return null;
    return await Contacts.update({ nome: nome, telefone: telefone, email: email, data_alteracao: Date.now() }, { where: { id: id } } );
  }
  
  const deleteContact = async ({ id, userId }) => {
    const contactExist = await Contact.findOne({ where: { id, userId: userId, isActive: true } });
    if (!contactExist) return null;
    return await Contacts.update({ isActive: false }, { where: { id: id, userId: userId } });
  }
  
  module.exports = { listContactsByUserId, createNewContact, updateContact, deleteContact };