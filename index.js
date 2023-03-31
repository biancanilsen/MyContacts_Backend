const app = require('./app');
require('dotenv').config();

// const environmentPort = process.env.PORT;

// app.listen(environmentPort, () => {
//     console.log(`listening on port ${environmentPort}`)
// })

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