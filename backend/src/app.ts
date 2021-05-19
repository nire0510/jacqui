import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import cors from 'cors';
import lusca from 'lusca';
import path from 'path';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import StatusCodes from 'http-status-codes';

import {
  MONGODB_URI,
} from './util/secrets';
import apiRouter from './routers/api';

// Create Express server
const app = express();

mongoose.Promise = bluebird;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(
  () => {
    console.log('MongoDB connected', MONGODB_URI);
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  },
).catch(err => {
  console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
  process.exit(-1);
});

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: 31557600000
  })
);

// routers:
app.use(apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error: any = new Error('Not Found');

  error.statusCode = 404;
  next(error);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(err);
});

export default app;
