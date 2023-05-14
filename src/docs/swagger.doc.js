const createUser = require('./user/user.create.swagger.js');
const login = require('./user/user.login.swagger.js');
const createContact = require('./contact/contact.create.swagger.js');
const getContacts = require('./contact/contact.get.swagger.js');
const updateContact = require('./contact/contact.update.swagger.js');


const definition = {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'Projeto de gerenciamento de contatos',
        contact: {
            name: 'Bianca Nilsen',
            email: 'nilsenn.bianca@gmail.com',
            url: 'https://github.com/biancanilsen'
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
    },
    servers: [
        {
            url: "https://my-contacts-backend.onrender.com",
        },
    ],


    paths: {
        "/user/register": {
            "post": createUser,
        },
        "/user/login": {
            "post": login
        },
        "/contact/register": {
            "post": createContact
        },
        "/contacts/list-contacts": {
            "get": getContacts
        },
        "/contacts/update": {
            "put": updateContact
        }
    },


}
module.exports = definition;