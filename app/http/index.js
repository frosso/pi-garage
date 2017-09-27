import express from 'express';
import debounce from 'lodash/debounce';

import bootstrap from './../bootstrap';
import serverMiddleware from './middlewares/server';
import routesMiddleware from './routes';

const app = new express();

const { config, gpioAdapter } = bootstrap();

serverMiddleware(app, config, gpioAdapter);
routesMiddleware(app, config);

const server = app.listen(config.port, (err) => {
  console.log('Ready to serve.');
  if (err) {
    console.log(err);
  }
});

// on SIGINT, the `process.exit` method is called, which causes the `exit` event to fire.
// so we're going to prevent calling the cleanup function twice in a short amount of time
const cleanup = debounce(() => {
  // Add shutdown logic here.
  console.log('Exiting...');
  gpioAdapter.destroy();
  server.close();
  process.exit();
}, 100);
process.on('exit', cleanup);
process.on('SIGINT', cleanup);
