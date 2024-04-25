const express = require("express");
const routes = require("./index");

const app = express();

// SWAGGER
const swaggerUi = require('swagger-ui-express');
const apiDocumentation = require('./apidocs.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3001; // Mengubah port menjadi 3001

app.listen(PORT, () => {
  console.log('Server Listening on PORT:', PORT);
});
