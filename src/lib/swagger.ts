import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Neo Telemetri Profile API',
      version: '1.3.0',
      description: 'Comprehensive API documentation for Neo Telemetri Profile system including Marketing and PR modules.',
      contact: {
        name: 'Neo Telemetri Tech Team',
        url: 'https://neotelemetri.com',
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Admin authentication and token management',
      },
      {
        name: 'Projects',
        description: 'Marketing module for project portfolio management',
      },
      {
        name: 'News',
        description: 'Public Relations module for news and announcements',
      },
      {
        name: 'Public',
        description: 'Open endpoints for website consumption (No Auth)',
      },
    ],
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: process.env.API_URL ? 'Production server' : 'Development server',
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
  },
  apis: ['./src/routes/*.{ts,js}', './src/controllers/*.{ts,js}'], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);
