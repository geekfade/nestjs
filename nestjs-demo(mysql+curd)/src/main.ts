import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { createLogger } from 'winston';
import * as winston from 'winston';
// import { WinstonModule, utilities } from 'nest-winston';
import 'winston-daily-rotate-file';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from '@nestjs/common';
// import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionFilter } from './filters/all-exception.filter';

async function bootstrap() {
  const logger = new Logger();
  // const instance = createLogger({
  //   transports: [],
  // });
  // const logger = WinstonModule.createLogger({
  //   instance,
  // });
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'], // 打印错误日志
    // bufferLogs: true, // 缓冲日志
    // logger,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix('/api/v1');

  const httpAdapter = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  const port = process.env.PORT || 8000;
  await app.listen(port);
  // logger.warn(`App 运行在 http://localhost:${port}`);
}
bootstrap();
