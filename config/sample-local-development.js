const config = {
  // the port where the server will listen
  port: 3000,

  // the list of doors available to be read/written
  // each server could potentially write to multiple doors
  doors: [
    // first door: reads status on GPIO #21, cannot open/close
    {
      // just a generic ID for the door. Must be unique.
      id: '7ae07169-69ef-4733-bf69-27e0ad0e3142',
      // GPIO # where the status of the door can be read from
      read: 21,
      // GPIO # that controls the door open/close commands
      write: false,
    },
    // second door: reads status on GPIO #16, open/closes through GPIO #20
    {
      // just a generic ID for the door. Must be unique.
      id: 'f9de2ba0-dca1-4ed3-825c-2bf48ac01125',
      // GPIO # where the status of the door can be read from
      read: 16,
      // GPIO # that controls the door open/close commands
      write: 20,
    },
  ],
};

module.exports = config;
