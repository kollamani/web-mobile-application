import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const resMessage =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal Server Error' };

    const message =
      typeof resMessage === 'object' && resMessage !== null && 'message' in resMessage
        ? (resMessage as any).message
        : resMessage;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: Array.isArray(message) ? message.join(', ') : message,
    });
  }
}