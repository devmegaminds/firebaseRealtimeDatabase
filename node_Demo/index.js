const dotenv = require('dotenv');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
dotenv.config({ path: 'config.env' });

const authenticationController = require('./controllers/authentication');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Swagger API',
            version: '1.0.0'
        }
    },
    apis: ['controllers/authentication.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// console.log(swaggerDocs);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/api/Authentication', authenticationController);
// app.listen(5000, () => console.log("Swagger Run Successfully..."))
var port = process.env.PORT || 3000;
app.listen(port, () => {
    // console.log(process.env.PORT);
    console.log(`connection is live on ${process.env.SERVER_BASE_URL}${port}`)
});