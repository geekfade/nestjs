import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { getUserDto } from '../../user/dto/get-user.dto';

@Injectable()
export class UpdateGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 获取请求对象
    const request = context.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: update.guard.ts:11 ~ UpdateGuard ~ canActivate ~ request:',
      request,
    );
    // 获取header中的token
    const token = request.headers.authorization;
    return true;
  }
}
