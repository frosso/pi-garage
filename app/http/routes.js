import doorMiddleware from './middlewares/door-middleware';
import * as doorControllers from './controllers/door-controller';
import * as statusControllers from './controllers/status';

export default function routesMiddleware(app, config) {
  app.get('/api/door', doorControllers.index);

  app.get('/api/door/:id',
    doorMiddleware({ doors: config.doors }),
    doorControllers.get
  );

  app.patch('/api/door/:id',
    doorMiddleware({ doors: config.doors }),
    doorControllers.patch
  );

  app.get('/api/status', statusControllers.index);
}
