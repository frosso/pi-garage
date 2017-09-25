import express from 'express';
import rpiGpio from 'rpi-gpio';
import GpioAdapter from '../gpio-promise';
import config from '../../config';
import middlewares from './middlewares';
import routesMiddleware from './routes';

const app = new express();
const gpio = new GpioAdapter(rpiGpio);

config.doors.map((door) => {
  if (!!door.read) {
    gpio.setup(door.read, rpiGpio.DIR_IN)
      .catch(err => console.log(err));
  }
  if (!!door.write) {
    gpio.setup(door.write, rpiGpio.DIR_OUT)
      .catch(err => console.log(err));
  }
});

middlewares(app, config, gpio);
routesMiddleware(app, config);

const server = app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
});

const cleanup = () => {
  // Add shutdown logic here.
  console.log('Exiting...');
  gpio.destroy(function () {
    console.log('All pins unexported');
  });
  server.close();
};
process.on('exit', cleanup);
process.on('SIGINT', cleanup);
