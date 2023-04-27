import swaggerAutogen from 'swagger-autogen';
import Logger from '../logger';
import config from '../../config';

const doc = {
  info: {
    title: config.PROJECT_NAME,
    description: 'Description',
  },
  host: `${config.HOST_ADDRESS}`,
  schemes: ['http', 'https'],
};
const logger = Logger('swaggerGenerate');
logger.verbose('generating docs');
const outputFile = './src/util/swagger/swagger-output.json';
const endpointsFiles = ['./src/routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc);
