import bodyParser from 'body-parser';
import methodOverride from 'method-override';

export default function serverMiddleware(app, config, gpio) {
  // force the JSON content type on all request (for home assistant, the REST switch cannot set the headers)
  app.use((req, res, next) => {
    req.headers['content-type'] = 'application/json';
    next();
  });

  // NOTE: when using req.body, you must fully parse the request body
//       before you call methodOverride() in your middleware stack,
//       otherwise req.body will not be populated.
  app.use(bodyParser.json());

  // using method override, since some APIs (like Home Assistant) don't allow to use PATCH as a method
  app.use(methodOverride(function (req, res) {
    if (!req.body || typeof req.body !== 'object') {
      return;
    }

    if (!('_method' in req.body)) {
      return;
    }

    const method = req.body._method;
    delete req.body._method;
    return method;
  }));

  app.use((req, res, next) => {
    req.gpio = gpio;
    next();
  });

  app.use((req, res, next) => {
    req.config = config;
    next();
  });
}
