import express, { Express, Request, Response } from 'express';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
import * as path from 'path';
import dotenv from 'dotenv';
import yaml from 'js-yaml';
import { dashboardRouter } from './routes/dashboardRoutes';
import { userRouter } from './routes/userRouter';
import { workersRouter } from './routes/workerRoutes';
import fs from 'fs';

dotenv.config();

const app: Express = express();

const port = process.env.APP_PORT || 3000;

const enviroment = process.env.APP_ENV;

try {
  if (!enviroment) {
    throw new Error('Błąd konfiguracji środowiska w pli `.env`');
  } else if (['development', 'dev'].includes(enviroment)) {
    const swaggerDoc = yaml.load(
      fs.readFileSync(path.resolve(__dirname, '..', 'swagger.yaml'), 'utf8')
    ) as SwaggerOptions;

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  }
} catch (error) {
  console.error(error);
  process.exit();
}

app.use(express.json());

app.use('/', dashboardRouter);
app.use('/workers', workersRouter);
app.use('/users', userRouter);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
