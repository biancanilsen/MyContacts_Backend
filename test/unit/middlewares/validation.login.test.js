const assert = require('assert');
const { validateEmail, validatePassword } = require('../../../src/middlewares/validation.login');
const { EmailIsValid } = require('../../../src/utils/emailValidator');
const defaultApiReturn = require('../../../src/utils/defaultApiReturn');

describe('Validation Middleware', () => {
    describe('validateEmail', () => {
        it('should return error if email is empty', () => {
            const req = { body: { email: '' } };
            const res = {
                status: function (statusCode) {
                    assert.strictEqual(statusCode, 200);
                    return this;
                },
                json: function (response) {
                    assert.deepStrictEqual(response, defaultApiReturn({ error: { message: 'O campo email não pode estar vazio' } }));
                },
            };
            const next = function () {
                assert.fail('next() should not have been called');
            };

            validateEmail(req, res, next);
        });

        it('should return error if email is invalid', () => {
            const req = { body: { email: 'invalidEmail' } };
            const res = {
                status: function (statusCode) {
                    assert.strictEqual(statusCode, 200);
                    return this;
                },
                json: function (response) {
                    assert.deepStrictEqual(response, defaultApiReturn({ error: { message: 'Email inválido' } }));
                },
            };
            const next = function () {
                assert.fail('next() should not have been called');
            };

            validateEmail(req, res, next);
        });

        it('should call next() if email is valid', () => {
            const req = { body: { email: 'valid@email.com' } };
            const res = {
                status: function (statusCode) {
                    assert.fail(`status() should not have been called with ${statusCode}`);
                },
                json: function (response) {
                    assert.fail(`json() should not have been called with ${response}`);
                },
            };
            const next = function () {
                assert.ok(true);
            };

            validateEmail(req, res, next);
        });
    });

    describe('validatePassword', () => {
        it('should return error if password field is empty', () => {
            const req = { body: { password: '' } };
            const res = {
                status: function (statusCode) {
                    assert.strictEqual(statusCode, 200);
                    return this;
                },
                json: function (response) {
                    assert.deepStrictEqual(response, defaultApiReturn({ error: { message: 'O campo senha não pode estar vazio' } }));
                },
            };
            const next = function () {
                assert.fail('next() should not have been called');
            };

            validatePassword(req, res, next);
        });

        it('should call next() if password is valid', () => {
            const req = { body: { password: 'validPassword' } };
            const res = {
                status: function (statusCode) {
                    assert.fail(`status() should not have been called with ${statusCode}`);
                },
                json: function (response) {
                    assert.fail(`json() should not have been called with ${response}`);
                },
            };
            const next = function () {
                assert.ok(true);
            };

            validatePassword(req, res, next);
        });
    });
});
