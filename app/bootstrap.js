import config from 'config';
import GpioAdapter from './gpio-promise';
import NullGpioAdapter from './null-gpio-promise';

function bootstrapDoors(doors, gpioAdapter) {
  return doors.map((door) => {
    door.pins = {};
    if (!!door.read) {
      door.pins.read = gpioAdapter.setup(door.read, 'in', 'both');
    }
    if (!!door.write) {
      door.pins.write = gpioAdapter.setup(door.write, 'out');
      door.pins.write.write(0);
    }

    return door;
  });
}

export default function bootstrap() {
  let gpioAdapter = new NullGpioAdapter();

  if(config.development === false) {
    const Gpio = require('onoff').Gpio;
    gpioAdapter = new GpioAdapter(Gpio);
  }

  config.doors = bootstrapDoors(config.doors, gpioAdapter);

  return {
    config,
    gpioAdapter,
  };
}
