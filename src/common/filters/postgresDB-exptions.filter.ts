import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

const POSTGRES_UNIQUE_CONSTRAINT_VIOLATION = '23505';

@Catch( QueryFailedError )
export class PostgresDBExceptionsFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof QueryFailedError && (exception.driverError as any).code === POSTGRES_UNIQUE_CONSTRAINT_VIOLATION) {
      response.status(409).json({
        statusCode: 409,
        message: 'Resource already exists',
      });
      return;
    };

    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }

};