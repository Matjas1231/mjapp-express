import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import dotenv from 'dotenv';
import YAML from 'yamljs';
import { dashboardRouter } from './routes/dashboardRoutes';
import { usersRouter } from './routes/usersRouter';
import { workersRouter } from './routes/workerRoutes';

dotenv.config();

const app: Express = express();

const port = process.env.APP_PORT || 3000;

const enviroment = process.env.APP_ENV;

try {
  if (!enviroment) {
    throw new Error('Błąd konfiguracji środowiska w pli `.env`');
  } else if (['development', 'dev'].includes(enviroment)) {
    const swaggerDoc = YAML.load(path.resolve(__dirname, '..', 'swagger.yaml'));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  }
} catch (error) {
  console.error(error);
  process.exit();
}

app.use(express.json());

app.use('/', dashboardRouter);
app.use('/workers', workersRouter);
app.use('/users', usersRouter);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
