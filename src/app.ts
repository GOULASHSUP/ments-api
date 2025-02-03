import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';
import { testConnection } from './repository/database';

import routes from './routes';

dotenvFlow.config();

// create express application
const app: Application = express();

app.use('/api', routes);

/**
 * 
 */
export function startServer() {


    testConnection();//test database connection


    const PORT: number = parseInt(process.env.PORT as string) || 4000; 
    app.listen(PORT, function() {
        console.log("Server is running on port: " + PORT);
    });
}