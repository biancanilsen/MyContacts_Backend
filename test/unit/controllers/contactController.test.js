const { listContactsByUserId, createNewContact, updateContact, deleteContact } = require('../../../src/controllers/contactController');
const contactService = require('../../../src/services/contactService');
const defaultApiReturn = require('../../../src/utils/defaultApiReturn');

jest.mock('../../../src/services/contactService', () => {
  return {
    listContactsByUserId: jest.fn(),
    createNewContact: jest.fn(),
    updateContact: jest.fn(),
    deleteContact: jest.fn(),
  }
});
jest.mock('../../../src/utils/defaultApiReturn');
jest.spyOn(console, 'error').mockImplementation(() => { });

describe('listContactsByUserId', () => {
  it('Should return status 500 if an error occurs', async () => {
    contactService.listContactsByUserId.mockImplementationOnce(() => {
      throw new Error('Some error');
    });

    const req = { tokenData: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await listContactsByUserId(req, res);

    expect(contactService.listContactsByUserId).toHaveBeenCalledWith({ id: 1 });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(defaultApiReturn).toHaveBeenCalledWith({ error: { message: 'Algo deu errado, tente novamente.' } });
  });

  it('Should return status 200 if there is no error', async () => {
    contactService.listContactsByUserId.mockReturnValueOnce([{ id: 1, name: 'Contact 1' }]);

    const req = { tokenData: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await listContactsByUserId(req, res);

    expect(contactService.listContactsByUserId).toHaveBeenCalledWith({ id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(defaultApiReturn).toHaveBeenCalledWith({ apiResponse: [{ id: 1, name: 'Contact 1' }] });
  });
});

describe('createNewContact', () => {
  it('Should return status 500 if an error occurs', async () => {
    contactService.createNewContact.mockImplementationOnce(() => {
      throw new Error('Some error');
    });

    const req = {
      body: { nome: 'John Doe', telefone: '12345678', email: 'johndoe@example.com' },
      tokenData: { id: 1 },
    };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await createNewContact(req, res);

    expect(contactService.createNewContact).toHaveBeenCalledWith({
      nome: 'John Doe',
      telefone: '12345678',
      email: 'johndoe@example.com',
      userId: 1,
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(defaultApiReturn).toHaveBeenCalledWith({ error: { message: 'Algo deu errado, tente novamente.' } });
  });

  it('Should return an error if contact already exists', async () => {
    contactService.createNewContact.mockReturnValueOnce(false);

    const req = {
      body: { nome: 'John Doe', telefone: '12345678', email: 'johndoe@example.com' },
      tokenData: { id: 1 },
    };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await createNewContact(req, res);

    expect(contactService.createNewContact).toHaveBeenCalledWith({
      nome: 'John Doe',
      telefone: '12345678',
      email: 'johndoe@example.com',
      userId: 1,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(defaultApiReturn).toHaveBeenCalledWith({ error: { message: 'Este contato já existe' } });
  });

  it('Should return status 201 if there is no error', async () => {
    contactService.createNewContact.mockReturnValueOnce(true);

    const req = {
      body: { nome: 'John Doe', telefone: '123456789', email: 'johndoe@example.com' },
      tokenData: { id: 1 },
    };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await createNewContact(req, res);

    expect(contactService.createNewContact).toHaveBeenCalledWith({ nome: 'John Doe', telefone: '123456789', email: 'johndoe@example.com', userId: 1 });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(defaultApiReturn).toHaveBeenCalledWith({});
  });
});

describe('updateContact', () => {
  it('Should return status 500 if an error occurs', async () => {
    contactService.updateContact.mockImplementationOnce(() => {
      throw new Error('Some error');
    });

    const req = { body: { id: 1, nome: 'John Doe', telefone: '555-555-5555', email: 'johndoe@email.com' } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await updateContact(req, res);

    expect(contactService.updateContact).toHaveBeenCalledWith({ id: 1, nome: 'John Doe', telefone: '555-555-5555', email: 'johndoe@email.com' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(defaultApiReturn).toHaveBeenCalledWith({ error: { message: 'Algo deu errado, tente novamente.' } });
  });

  it('SShould return an error if the contact does not exist', async () => {
    contactService.updateContact.mockReturnValueOnce(false);

    const req = { body: { id: 1, nome: 'John Doe', telefone: '555-555-5555', email: 'johndoe@email.com' } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await updateContact(req, res);

    expect(contactService.updateContact).toHaveBeenCalledWith({ id: 1, nome: 'John Doe', telefone: '555-555-5555', email: 'johndoe@email.com' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(defaultApiReturn).toHaveBeenCalledWith({ error: { message: 'Este contato não existe' } });
  });

  it('Should return status 200 if there is no error', async () => {
    contactService.updateContact.mockReturnValueOnce(true);

    const req = { body: { id: 1, nome: 'John Doe', telefone: '555-555-5555', email: 'johndoe@email.com' } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await updateContact(req, res);

    expect(contactService.updateContact).toHaveBeenCalledWith({ id: 1, nome: 'John Doe', telefone: '555-555-5555', email: 'johndoe@email.com' });
  });
});

describe('deleteContact', () => {
  it('Should return status 500 if an error occurs', async () => {
    contactService.deleteContact.mockImplementationOnce(() => {
      throw new Error('Some error');
    });

    const req = { tokenData: { id: 1 }, params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await deleteContact(req, res);

    expect(contactService.deleteContact).toHaveBeenCalledWith({ id: 1, userId: 1 });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(defaultApiReturn).toHaveBeenCalledWith({ error: { message: 'Algo deu errado, tente novamente.' } });
  });

  it('Should return status 200 if the contact does not exist', async () => {
    contactService.deleteContact.mockReturnValueOnce(false);

    const req = { tokenData: { id: 1 }, params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await deleteContact(req, res);

    expect(contactService.deleteContact).toHaveBeenCalledWith({ id: 1, userId: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(defaultApiReturn).toHaveBeenCalledWith({ error: { message: 'Este contato não existe' } });
  });

  it('Should return status 200 if there is no error', async () => {
    contactService.deleteContact.mockReturnValueOnce(true);

    const req = { tokenData: { id: 1 }, params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await deleteContact(req, res);

    expect(contactService.deleteContact).toHaveBeenCalledWith({ id: 1, userId: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(defaultApiReturn).toHaveBeenCalledWith({});
  });
});

