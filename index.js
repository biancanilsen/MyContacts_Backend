const port =  3001;
const app = require('./app');

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})