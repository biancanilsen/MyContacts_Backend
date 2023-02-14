process.env.JWT_SECRET = 'secret-key';
const { User } = require('../../../src/database/models');
const { createNewUser } = require('../../../src/services/userService');

jest.mock('../../../src/database/models', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe('createNewUser', () => {
  beforeEach(() => {
    User.findOne.mockReset();
    User.create.mockReset();
  });

  it('Should returns null when a user with the same email already exists', async () => {
    User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });
    const result = await createNewUser({ email: 'test@example.com', password: 'password' });
    expect(result).toBe(null);
    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
    expect(User.create).not.toHaveBeenCalled();
  });

  it('Should create a new user when the email is not in use', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ id: 1, email: 'test@example.com', password: 'password' });
    const result = await createNewUser({ email: 'test@example.com', password: 'password' });
    expect(result).toEqual({ id: 1, email: 'test@example.com', password: 'password' });
    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
    expect(User.create).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
  });
});