import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendResponse } from '../utils/response.util.js';

/**
 * Middleware to validate request data against a Zod schema
 * @param schema Zod schema to validate against
 */
export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Flatten error messages for the main response message
        const errorMessage = error.issues
          .map((issue) => `${issue.path.filter((p) => p !== 'body').join('.')}: ${issue.message}`)
          .join(', ');

        return sendResponse(res, 400, {
          data: error.format(), // Detailed validation errors
          message: `Validation failed: ${errorMessage}`,
        });
      }
      return next(error);
    }
  };
};
