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
