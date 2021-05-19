import logger from './logger';
import dotenv from 'dotenv';

logger.debug('Using .env file to supply config environment variables');
dotenv.config();

export const ENVIRONMENT = process.env.NODE_ENV;
export const MONGODB_URI = process.env.MONGODB_URI;
