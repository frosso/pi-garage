import express from 'express';
import { Gpio } from 'onoff';
import GpioAdapter from '../gpio-promise';
import config from '../../config';
import middlewares from './middlewares';
import routesMiddleware from './routes';

const app = new express();
const gpioAdapter = new GpioAdapter(Gpio);

config.doors.map((door) => {
  if (!!door.read) {
    gpioAdapter.setup(door.read, 'in', 'both');
  }
  if (!!door.write) {
    gpioAdapter.setup(door.write, 'out');
  }
});

middlewares(app, config, gpioAdapter);
routesMiddleware(app, config);

const server = app.listen(config.port, (err) => {
  console.log('Ready to serve.');
  if (err) {
    console.log(err);
  }
});

const cleanup = () => {
  // Add shutdown logic here.
  console.log('Exiting...');
  gpioAdapter.destroy();
  server.close();
  process.exit();
};
process.on('exit', cleanup);
process.on('SIGINT', cleanup);
