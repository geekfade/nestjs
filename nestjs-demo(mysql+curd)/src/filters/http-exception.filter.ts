import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取上下文
    const request = ctx.getRequest(); // 获取请求对象
    const response = ctx.getResponse(); // 获取响应对象
    const status = exception.getStatus(); // 获取状态码
    this.logger.error(exception.message, exception.stack);
    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      //   path: request.url,
      //   method: request.method,
      message: exception.message || HttpException.name,
    }); // 响应状态码
    throw new Error('Method not implemented.');
  }
}
