import { Request, Response, NextFunction } from 'express';
import BusinessError from '../../src/infraestructure/errors/business-error';

interface HandledError {
  date: string;
  status?: string;
  message?: string;
}

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const handledError: HandledError = { date: '2024-01-01 00:00:00' };
  let statusCode = 500;

  if (err instanceof BusinessError) {
    handledError.status = 'BUSINESS_ERROR';
    statusCode = 422;
    handledError.message = err.message;
  } else {
    handledError.status = 'UNKNOWN_ERROR';
    handledError.message = err.message;
  }

  res.status(statusCode);
  res.json(handledError);
}