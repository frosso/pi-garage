class GpioPromise {
  constructor(gpio) {
    this.gpio = gpio;
  }

  setup(port, mode) {
    return new Promise((resolve, reject) => {
      this.gpio.setup(port, mode, (err) => {
          if (err) {
            return reject(err);
          }

          return resolve();
        }
      );
    });
  }

  read(pin) {
    return new Promise((resolve, reject) => {
      this.gpio.read(pin, (err, value) => {
        if (err) {
          return reject(err);
        }

        return resolve(value);
      });
    });
  }

  destroy() {
    return new Promise((resolve, reject) => {
      this.gpio.destroy(function () {
        resolve();
      });
    });
  }
}

export default GpioPromise;
