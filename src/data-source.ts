import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  //   host: 'localhost',
  //   port: 3306,
  //   username: 'root',
  //   password: 'admin',
  //   database: 'db1',
  logging: true,
  migrations: [__dirname + '/migration/*.ts'],
  entities: [__dirname + '/entity/*{.js,.ts}']
  //   synchronize: true
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default dataSource;
