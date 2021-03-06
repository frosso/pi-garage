export function index(req, res) {
  res.json({
    data: req.config.doors.map(door => {
      return {
        id: door.id,
        abilities: {
          read: !!door.read,
          write: !!door.write,
        },
      };
    }),
    error: false,
  });
}

export async function get(req, res) {
  if (!req.door.read) {
    return res.status(404).json({ data: { msg: 'Cannot read status on door' }, error: true, });
  }

  return res.json({
    data: {
      id: req.door.id,
      status: await req.gpio.read(req.door.read),
    },
    error: false,
  });
}

export async function patch(req, res) {
  if (!req.door.write) {
    return res.status(404).json({ data: { msg: 'Cannot open/close door' }, error: true, });
  }

  // write 1 to the GPIO PIN, then write 0 right after it
  await req.gpio.write(req.door.write, 1)
    .then(res => new Promise(resolve => {
      setTimeout(resolve, 300);
    }))
    .then(() => req.gpio.write(req.door.write, 0));

  return res.json({
    data: {
      id: req.door.id,
    },
    error: false,
  });
}
