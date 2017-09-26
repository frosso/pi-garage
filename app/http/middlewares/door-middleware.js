const doorMiddleware = (options) => {
  return (req, res, next) => {
    const doorId = req.params.id;
    const door = options.doors.find(door => door.id === doorId);
    if (!door) {
      return res.status(404).json({ data: { msg: 'Not found' }, error: true, });
    }

    req.door = door;
    next();
  };
};

export default doorMiddleware;
