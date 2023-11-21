import { Sequelize } from 'sequelize';

// const dbConnection = process.env.DB_CONNECTION || 'sqlite';

const db = new Sequelize('app', '', '', {
  storage: './database.sqlite',
  dialect: 'sqlite',
  logging: false
});

db
  //   .sync({ force: true })
  .sync()
  .then(() => {
    console.log('Baza danych została zsynchronizowana.');
  })
  .catch((error) => {
    console.error('Błąd podczas synchronizacji bazy danych:', error);
  });

export default db;
