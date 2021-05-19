
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import StatusCodes from 'http-status-codes';

export default function validate(req: Request, res: Response, next: NextFunction): void {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error: any = new Error();

    error.statusCode = StatusCodes.BAD_REQUEST;
    error.errors = errors.array();

    return next(error);
  }

  next();
}
