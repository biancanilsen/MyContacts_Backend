const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require('cors');
const routerIndex = require('./src/routes/index.routes');
const definition = require('./src/docs/swagger.doc.js');

const swaggerUi = require('swagger-ui-express');
const app = express();


const options = {
    definition,
    apis: ["./src/routes/*js"]
}

const specs = swaggerJsdoc(options);



app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs,
    {
        customCssUrl:
            "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-flattop.css",
    }))
app.use(routerIndex);

module.exports = app; 