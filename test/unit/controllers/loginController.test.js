const LoginController = require('../../../controllers/loginController');
const authService = require('../../../services/authService');
const defaultApiReturn = require('../../../utils/defaultApiReturn');

jest.mock('../../../services/authService', () => {
  return {
    authentication: jest.fn()
  };
});
jest.mock('../../../utils/defaultApiReturn');

describe('LoginController', () => {
  it('Should return status 404 if authentication fails', async () => {
    authService.authentication.mockReturnValueOnce(false);

    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await LoginController(req, res);

    expect(authService.authentication).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(defaultApiReturn).toHaveBeenCalledWith({ error: { message: 'Usuário não encontrado' } });
  });

  it('Should return status 200 if authentication succeeds', async () => {
    authService.authentication.mockReturnValueOnce({ data: 'some data' });

    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await LoginController(req, res);

    expect(authService.authentication).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(defaultApiReturn).toHaveBeenCalledWith({ apiResponse: { data: 'some data' } });
  });
});