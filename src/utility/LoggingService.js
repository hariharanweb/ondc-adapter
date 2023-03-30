import log4js from 'log4js';

const getLogger = (key) => {
  const logger = key ? log4js.getLogger(`Adapter-${key}`) : log4js.getLogger('Adapter');
  logger.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug';
  return logger;
};

export default {
  getLogger,
};
