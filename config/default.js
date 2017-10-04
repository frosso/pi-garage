const config = {
  // the port where the server will listen
  port: 3000,

  // dummy mode
  development: false,

  // the list of doors available to be read/written
  // each server could potentially write to multiple doors
  doors: [],
};

module.exports = config;
