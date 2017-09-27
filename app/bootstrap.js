import { Gpio } from 'onoff';
import config from 'config';
import GpioAdapter from './gpio-promise';

export default function bootstrap() {
  const gpioAdapter = new GpioAdapter(Gpio);

  config.doors = config.doors.map((door) => {
    door.pins = {};
    if (!!door.read) {
      door.pins.read = gpioAdapter.setup(door.read, 'in', 'both');
    }
    if (!!door.write) {
      door.pins.write = gpioAdapter.setup(door.write, 'out');
    }

    return door;
  });

  return {
    config,
    gpioAdapter,
  };
}
