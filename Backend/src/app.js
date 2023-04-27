import session from 'express-session';
import express from 'express';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import fs from 'fs';
import compression from 'compression';
// import YAML from 'yamljs';
// import specs from './util/swagger/index.yml';
import router from './routes';
import initPassport from './middlewares/auth';
import logger from './middlewares/morganLogger';
import config from './config';

// import { auctionService } from './controllers/carController';
/* const swaggerDocument = YAML.load(
  path.join(__dirname, './util/swagger/index.yaml')
); */
// import swaggerDocument from './util/swagger/swagger-output.json';
import { apiDocumentation } from './util/swagger/doc';
// import doc from './util/swagger/index.yml';
import './util/error';
import { errorHandler } from './middlewares/errorHandler';

initPassport(passport);

const app = express();
// const doc = YAML.load('src/util/swagger/index.yaml');
/* const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:4001",
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};  */

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: config.SECRET }));
app.use(compression());
app.use(logger);
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(apiDocumentation, {
    opts: {
      persistAuthorization: true,
    },
  })
);
app.use(router);
app.use(errorHandler);

/* app.use(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (_req, res) => {
    res.status(200).json({
      success: true,
      msg: 'You are successfully authenticated to this route!',
    });
  }
); */

export default app;
