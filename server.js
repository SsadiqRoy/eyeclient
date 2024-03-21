const path = require('node:path');
const dotenv = require('dotenv');

process.on('uncaughtException', (error) => {
  console.log('🔥🔥UncaughtException Error', error);
  process.exit(1);
});

dotenv.config({ path: path.join(__dirname, './eyeclientfront.env') });

const app = require('./app');

const server = app.listen(process.env.port, process.env.host, () => console.log('🍿Eye Client is Up....'));

process.on('unhandledRejection', (error) => {
  console.log('🔥🔥UnhandledRejection Error', error);
  server.close(() => {
    process.exit(1);
  });
});
