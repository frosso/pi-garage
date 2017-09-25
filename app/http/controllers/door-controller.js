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
  return res.json({
    data: {
      id: req.door.id,
      status: await req.gpio.read(req.door.read),
    },
    error: false,
  });
}
