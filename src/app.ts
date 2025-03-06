import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';
import { testConnection } from './repository/database';
import cors from 'cors';

import routes from './routes';

dotenvFlow.config();

// create express application
const app: Application = express();

function setupCors() {
    app.use(cors({
        origin: "*",
        methods: 'GET,PUT,POST,DELETE',
        allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
        credentials: true,

    }))
}

export function startServer() {

    setupCors();

    app.use(express.json());

    app.use('/api', routes);

    testConnection();//test database connection


    const PORT: number = parseInt(process.env.PORT as string) || 4000; 
    app.listen(PORT, function() {
        console.log("Server is running on port: " + PORT);
    });
}