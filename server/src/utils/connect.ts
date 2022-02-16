import mongoose from 'mongoose';
import config from 'config';

import logger from './logger';

const connect = async () => {
  const uriDB = config.get<string>('uriDB');

  try {
    await mongoose.connect(uriDB);

    logger.info('DB connected with success');
  } catch (error) {
    logger.error('Could not connect to db');

    process.exit(1);
  }
};

export default connect;
