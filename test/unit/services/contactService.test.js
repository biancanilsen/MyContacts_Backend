process.env.JWT_SECRET = 'secret-key';
const { Contact } = require('../../../src/database/models');
const { listContactsByUserId, createNewContact, updateContact, deleteContact } = require('../../../src/services/contactService');;

jest.mock('../../../src/database/models', () => ({
  Contact: {
    findAll: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn()
  }
}));

describe('listContactsByUserId', () => {
  beforeEach(() => {
    Contact.findAll.mockReset();
  });

  it('Should return null when no contacts are found', async () => {
    Contact.findAll.mockResolvedValue(null);
    const result = await listContactsByUserId({ id: 1 });
    expect(result).toBe(null);
    expect(Contact.findAll).toHaveBeenCalledWith({
      where: { userId: 1, isActive: true },
      attributes: { exclude: ['userId', 'UserId', 'data_cadastro', 'data_alteração', 'isActive'] }
    });
  });

  it('Should return the list of contacts when they are found', async () => {
    const contacts = [
      { name: 'John Doe', email: 'johndoe@example.com' },
      { name: 'Jane Doe', email: 'janedoe@example.com' }
    ];
    Contact.findAll.mockResolvedValue(contacts);
    const result = await listContactsByUserId({ id: 1 });
    expect(result).toEqual(contacts);
    expect(Contact.findAll).toHaveBeenCalledWith({
      where: { userId: 1, isActive: true },
      attributes: { exclude: ['userId', 'UserId', 'data_cadastro', 'data_alteração', 'isActive'] }
    });
  });
});

describe('createNewContact', () => {
  beforeEach(() => {
    Contact.create.mockReset();
  });

  it('Should create a new contact with the provided data', async () => {
    Contact.create.mockResolvedValue({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', userId: 1 });
    const result = await createNewContact({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', userId: 1 });
    expect(result).toEqual({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', userId: 1 });
    expect(Contact.create).toHaveBeenCalledWith({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', userId: 1 });
  });
});

describe('updateContact', () => {
  beforeEach(() => {
    Contact.findOne.mockReset();
    Contact.update.mockReset();
  });

  it('Should update an existing contact with the provided data', async () => {
    Contact.findOne.mockResolvedValue({ nome: 'Jane Doe', telefone: '456789', email: 'janedoe@example.com', userId: 1 });
    Contact.update.mockResolvedValue({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', data_alteracao: Date.now() });
    const result = await updateContact({ id: 1, nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com' });
    expect(result).toEqual({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', data_alteracao: expect.any(Number) });
    expect(Contact.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(Contact.update).toHaveBeenCalledWith({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', data_alteracao: expect.any(Number) }, { where: { id: 1 } });
  });

  it('Should return null if the contact does not exist', async () => {
    Contact.findOne.mockResolvedValue(null);
    const result = await updateContact({ id: 1, nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com' });
    expect(result).toBe(null);
    expect(Contact.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(Contact.update).not.toHaveBeenCalled();
  });
});

describe('deleteContact', () => {
  beforeEach(() => {
    Contact.findOne.mockReset();
    Contact.update.mockReset();
  });

  it('Should delete a contact with the provided id and userId', async () => {
    Contact.findOne.mockResolvedValue({ id: 1, userId: 1, isActive: true });
    Contact.update.mockResolvedValue({ id: 1, userId: 1, isActive: false });
    const result = await deleteContact({ id: 1, userId: 1 });
    expect(result).toEqual({ id: 1, userId: 1, isActive: false });
    expect(Contact.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: 1, isActive: true } });
    expect(Contact.update).toHaveBeenCalledWith({ isActive: false }, { where: { id: 1, userId: 1 } });
  });

  it('Should return null if the contact with the provided id and userId doesn\'t exist', async () => {
    Contact.findOne.mockResolvedValue(null);
    const result = await deleteContact({ id: 1, userId: 1 });
    expect(result).toBeNull();
    expect(Contact.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: 1, isActive: true } });
    expect(Contact.update).not.toHaveBeenCalled();
  });
});