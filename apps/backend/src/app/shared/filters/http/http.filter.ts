import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { loggerInstance } from '@gurusishyan-logger';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const url = req.url;
    const method = req.method;
    const res = ctx.getResponse();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const error_response = {
      code: status,
      payload:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message.message || exception.message.error || `${exception.message}` || null
          : exception.message.error ||
            `${exception.message}` ||
            'Internal server error',
      error: true,
      url,
      method,
    };
    Logger.log(`${method} ${status} ${url}`, 'CustomErrorHandler');
    loggerInstance.log(
      `${method} ${status} ${url} ${
        exception.message || error_response.payload
      }`,
      'error'
    );
    res.status(status).json(error_response);
  }
}
