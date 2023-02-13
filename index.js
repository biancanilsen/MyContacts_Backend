const app = require('./app');
require('dotenv').config();

const environmentPort = process.env.PORT;

app.listen(environmentPort, () => {
    console.log(`listening on port ${environmentPort}`)
})

