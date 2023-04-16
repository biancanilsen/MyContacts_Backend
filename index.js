const app = require('./app');
require('dotenv').config();
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'src', 'database', 'config', 'config.env') });
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const routerIndex = require('./src/routes/index.routes');
const port = 3001;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routerIndex);

const environmentPort = process.env.PORT

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})