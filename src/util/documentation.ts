import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Application } from 'express';

export function setupDocs(app: Application) {

    // swagger definition
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'SecondGear API Documentation',
            version: '1.0.0',
            description: 'This is the official API documentation for the SecondGear application. This API enables users to register, authenticate, and manage car listings, including adding, updating, retrieving, and deleting car data. Built with Express.js and TypeScript, the API follows RESTful principles and supports secure authentication via JWT.',
        },
        servers: [
            {
                url: 'http://localhost:4000/api/',
                description: 'Local development server',
            },
            {
                url: 'https://secondgear-frontend.onrender.com/api/',
                description: 'Live server',
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'auth-token',
                },
            },
            schemas: {
                Car: {
                    type: 'object',
                    properties: {
                        brand: { type: 'string' },
                        model: { type: 'string' },
                        engine: { type: 'string' },
                        year: { type: 'number' },
                        imageURL: { type: 'string' },
                        price: { type: 'number' },
                        stock: { type: 'number' },
                        discount: { type: 'boolean' },
                        discountPct: { type: 'number' },
                        isHidden: { type: 'boolean' },
                        _createdBy: { type: 'string' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                        registerDate: { type: 'string' },
                    },
                },
            },
        }
    }

    // swagger options
    const options = {
        swaggerDefinition,
        apis: ['**/*.ts']
    }

    // swagger specification
    const swaggerSpec = swaggerJSDoc(options);

    // create the docs route
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}