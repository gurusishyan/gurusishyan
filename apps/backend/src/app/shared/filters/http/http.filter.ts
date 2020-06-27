import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { loggerInstance } from '@gurusishyan-logger';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const url = req.url
    const method = req.method
    const res = ctx.getResponse();
    const status = exception.getStatus();
    const error_response = {
      code: status,
      payload: exception.message.error || `${exception.message}` || null,
      error: true,
      url,
      method,
    };
    Logger.log(
      `${method} ${status} ${url}`,'CustomErrorHandler'
    );
    loggerInstance.log(`${method} ${status} ${url} ${error_response.payload}`,"error")
    res.status(status).json(error_response)
  }
}
