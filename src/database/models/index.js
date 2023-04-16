'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require('./user')(sequelize, Sequelize);
const Contact = require('./contact')(sequelize, Sequelize);

db.User = User;
db.Contact = Contact;

User.associate(db);
Contact.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;