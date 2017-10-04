class NullGpioPromise {
  setup() {
    // TODO: return an actual object, like the GpioPromise would do?
    return {};
  }

  read() {
    return new Promise.resolve(null);
  }

  write() {
    return new Promise.resolve(null);
  }

  destroy() {}
}

export default NullGpioPromise;
