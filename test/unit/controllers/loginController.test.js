const LoginController = require('../../../src/controllers/loginController');
const authService = require('../../../src/services/authService');
const defaultApiReturn = require('../../../src/utils/defaultApiReturn');

jest.mock('../../../src/services/authService', () => {
  return {
    authentication: jest.fn()
  };
});
jest.mock('../../../src/utils/defaultApiReturn');

describe('LoginController', () => {
  it('Should return an error if authentication fails', async () => {
    authService.authentication.mockReturnValueOnce(false);

    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await LoginController(req, res);

    expect(authService.authentication).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(defaultApiReturn).toHaveBeenCalledWith({ error: { message: 'Usuário não encontrado' } });
  });

  it('Should return status 201 if authentication succeeds', async () => {
    authService.authentication.mockReturnValueOnce({ data: 'some data' });

    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await LoginController(req, res);

    expect(authService.authentication).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(defaultApiReturn).toHaveBeenCalledWith({ apiResponse: { data: 'some data' } });
  });
});