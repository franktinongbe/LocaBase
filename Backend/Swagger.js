const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LocaBase API',
      version: '1.0.0',
      description: 'API pour la gestion des utilisateurs, hôtels et restaurants',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Serveur local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Emplacement de tes routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
