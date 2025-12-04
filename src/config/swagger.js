const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Telemedicine Application',
        description: 'API Documentation',
    },
    servers: [
        { url: "http://localhost:3000" },
    ],
};

const outputFile = "../../swagger-output.json"
const routes = ['../routes/index.js'];


swaggerAutogen(outputFile, routes, doc);