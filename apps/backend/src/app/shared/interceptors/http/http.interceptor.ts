import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loggerInstance } from '@gurusishyan-logger';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const currentTime = Date.now();
    const method = req.method;
    const url = req.url;
    return next.handle().pipe(
      map((data) => {
        if (data.error) {
          loggerInstance.log(
            `${method} ${res.statusCode} ${url} - Error :: ${data.message}`,
            'error'
          );
          return {
            code: res.statusCode,
            payload: 'Error while processing the request',
            error: true,
            timeTaken: Date.now() - currentTime,
            url,
            method,
          };
        } else {
          loggerInstance.log(
            `${method} ${res.statusCode} ${url} - Success`,
            'info'
          );
          return {
            code: res.statusCode,
            payload: data,
            error: false,
            timeTaken: Date.now() - currentTime,
            url,
            method,
          };
        }
      })
    );
  }
}
