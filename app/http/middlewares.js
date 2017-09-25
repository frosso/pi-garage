export default function middlewares(app, config, gpio) {
  app.use((req, res, next) => {
    req.gpio = gpio;
    next();
  });
  app.use((req, res, next) => {
    req.config = config;
    next();
  });
}
