import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIp from 'request-ip';
// import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost; // 获取适配器
    const ctx = host.switchToHttp(); // 获取上下文
    const request = ctx.getRequest(); // 获取请求对象
    const response = ctx.getResponse(); // 获取响应对象

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR; // 获取状态码
    const msg: unknown = exception['response'] || 'Internal Server Error';
    // 处理多种异常
    // if (exception instanceof QueryFailedError) {
    //   msg = exception.message;
    //   if (exception.driverError.errno === 1062) {
    //     msg = '数据重复';
    //   }
    // }

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toISOString(),
      ip: requestIp.getClientIp(request),
      exception: exception['name'],
      error: msg,
    };
    this.logger.error('[toimc]', responseBody);
    httpAdapter.reply(response, responseBody, httpStatus); // 响应状态码
  }
}
