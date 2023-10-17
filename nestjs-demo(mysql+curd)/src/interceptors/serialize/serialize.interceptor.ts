import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data: any) => {
        // return data;
        return plainToInstance(this.dto, data, {
          // 设置为true，会把多余的字段过滤掉，需要在dto中设置@Expose()
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
