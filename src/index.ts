import express, { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
import * as path from 'path';
import dotenv from 'dotenv';

import { router as dashboardRouter } from './routes/dashboardRutes';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

const enviroment = process.env.NODE_ENV;

try {
  if (!enviroment) {
    throw new Error('Błąd konfiguracji środowiska w pli `.env`');
  } else if (['development', 'dev'].includes(enviroment)) {
    const swaggerOptions: SwaggerOptions = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Mjapp',
          version: '1.0.0',
          description: ''
        }
      },
      apis: [path.resolve(__dirname, './routes/*.ts')]
    };

    const swaggerSpec = swaggerJSDoc(swaggerOptions);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
} catch (error) {
  console.error(error);
  process.exit();
}

app.use('/', dashboardRouter);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
