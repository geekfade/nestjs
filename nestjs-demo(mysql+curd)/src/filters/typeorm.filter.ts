import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let code = 500;
    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno;
    }

    const response = ctx.getResponse();
    response.status(500).json({
      code: code,
      timestamp: new Date().toISOString(),
      //   path: request.url,
      //   method: request.method,
      message: exception.message,
    }); // 响应状态码
  }
}
