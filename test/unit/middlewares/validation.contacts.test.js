const { Contacts } = require('../../../src/database/models');
const {
    validatePhone,
    validateName,
    validateEmail,
    validateEmailIsInUseByOtherContact
} = require('../../../src/middlewares/validation.contacts');
const defaultApiReturn = require('../../../src/utils/defaultApiReturn');
const validator = require('validator');

describe('validatePhone', () => {
    it('should return error message for invalid phone number', async () => {
        const req = { body: { telefone: '123' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        await validatePhone(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(defaultApiReturn({ error: { message: 'Número de telefone inválido.' } }));
        expect(next).not.toHaveBeenCalled();
    });

    it('should return error message if phone number is already associated with another contact', async () => {
        const req = { body: { id: 1, telefone: '12345678901' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        Contacts.findOne = jest.fn().mockResolvedValue({ dataValues: { id: 2, nome: 'John Doe', telefone: '12345678901', isActive: true } });

        await validatePhone(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(defaultApiReturn({ error: { message: 'Este telefone está associado ao contato: John Doe.' } }));
        expect(next).not.toHaveBeenCalled();
    });
});

describe('validateName middleware', () => {
    const next = jest.fn();
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    beforeEach(() => {
        next.mockClear();
        res.status.mockClear();
        res.json.mockClear();
    });

    it('should return error message if name field is empty', async () => {
        const req = { body: { id: 1, nome: '' } };
        await validateName(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(defaultApiReturn({ error: { message: 'O campo Nome não pode estar vazio.' } }));
        expect(next).not.toHaveBeenCalled();
    });

    it('should return error message if name is already in use by other contact', async () => {
        Contacts.findOne = jest.fn().mockResolvedValue({ dataValues: { id: 2, nome: 'John Doe' } });
        const req = { body: { id: 1, nome: 'John Doe' } };
        await validateName(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(defaultApiReturn({ error: { message: 'Este Nome já está em uso por um dos seus contatos.' } }));
        expect(next).not.toHaveBeenCalled();
    });

    it('should return error message if database query throws an error', async () => {
        Contacts.findOne = jest.fn().mockRejectedValue(new Error('Database error'));
        const req = { body: { id: 1, nome: 'John Doe' } };
        await validateName(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
        expect(next).not.toHaveBeenCalled();
    });
});

const mockRequest = (email) => {
    return {
        body: {
            email,
        },
    };
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('validateEmail', () => {
    it('should call next if email is valid', async () => {
        const req = mockRequest('john.doe@example.com');
        const res = mockResponse();

        const next = jest.fn();

        await validateEmail(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should return an error message if email is empty', async () => {
        const req = mockRequest('');
        const res = mockResponse();

        const next = jest.fn();

        await validateEmail(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(defaultApiReturn({ error: { message: 'O campo Email não pode estar vazio.' } }));
    });

    it('should return an error message if email is not valid', async () => {
        const req = mockRequest('john.doe@');
        const res = mockResponse();

        const next = jest.fn();

        await validateEmail(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(defaultApiReturn({ error: { message: 'O email informado não é válido.' } }));
    });
});

jest.mock('../../../src/database/models', () => ({
    Contacts: {
        findOne: jest.fn(),
    },
}));

describe('validateEmailIsInUseByOtherContact', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                id: 1,
                email: 'john.doe@example.com',
            },
        };

        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call next() if email is not in use by other contact', async () => {
        Contacts.findOne.mockResolvedValueOnce(null);

        await validateEmailIsInUseByOtherContact(req, res, next);

        expect(Contacts.findOne).toHaveBeenCalledWith({
            where: { email: req.body.email, isActive: true },
        });
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    it('should return an error message if email is in use by another contact', async () => {
        Contacts.findOne.mockResolvedValueOnce({
            dataValues: { id: 2, nome: 'Jane Doe' },
        });

        await validateEmailIsInUseByOtherContact(req, res, next);

        expect(Contacts.findOne).toHaveBeenCalledWith({
            where: { email: req.body.email, isActive: true },
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            defaultApiReturn({
                error: {
                    message: `Este E-mail está associado ao contato: Jane Doe.`,
                },
            })
        );
        expect(next).not.toHaveBeenCalled();
    });

    it('should return a 500 error if something goes wrong', async () => {
        Contacts.findOne.mockRejectedValueOnce(new Error('Database error'));

        await validateEmailIsInUseByOtherContact(req, res, next);

        expect(Contacts.findOne).toHaveBeenCalledWith({
            where: { email: req.body.email, isActive: true },
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(
            defaultApiReturn({
                error: { message: 'Algo deu errado, tente novamente.' },
            })
        );
        expect(next).not.toHaveBeenCalled();
    });
});

