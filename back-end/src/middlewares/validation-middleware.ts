import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { ApplicationError } from '../types/protocols';

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'body');
}

export function validateParams<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'params');
}

export function validateQuery<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'query');
}

function validate(schema: ObjectSchema, type: 'body' | 'params' | 'query') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    });

    if (!error) {
      next();
    } else {
      res.status(400).send(invalidDataError(error.details.map((d) => d.message)));
    }
  };
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;

function invalidDataError(details: string[]): ApplicationInvalidateDataError {
  return {
    error_code: "INVALID_DATA",
    error_description: 'Os dados fornecidos no corpo da requisição são inválidos.',
    details: details
  };
}

type ApplicationInvalidateDataError = ApplicationError & {
  details: string[];
};