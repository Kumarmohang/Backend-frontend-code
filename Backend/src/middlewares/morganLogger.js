import morgan from 'morgan';
import Logger from '../util/logger/index';

const logger = Logger('HTTP Logger');
logger.stream = {
  write: (message) =>
    logger.info(message.substring(0, message.lastIndexOf('\n'))),
};

export default morgan('combined', {
  stream: logger.stream,
});
