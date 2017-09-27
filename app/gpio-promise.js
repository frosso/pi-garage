class GpioPromise {
  constructor(gpio) {
    this.gpio = gpio;
    this.pins = {};
  }

  setup(pin, mode, edge = 'none') {
    return this.pins[pin] = new this.gpio(pin, mode, edge);
  }

  read(pin) {
    return new Promise((resolve, reject) => {
      this.pins[pin].read((err, value) => {
        if (err) {
          return reject(err);
        }

        return resolve(value);
      });
    });
  }

  write(pin, value) {
    return new Promise((resolve, reject) => {
      this.pins[pin].write(value, (err, value) => {
        if (err) {
          return reject(err);
        }

        return resolve(value);
      });
    });
  }

  destroy() {
    Object.values(this.pins).forEach(pin => pin.unexport());
    this.pins = {};
  }
}

export default GpioPromise;
