import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  // 常见错误：在使用AdminGuard时，需要在app.module.ts中引入UserModule
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 获取请求对象
    const request = context.switchToHttp().getRequest();
    // 2. 获取用户对象,判断用户是否有权限
    const user = (await this.userService.find(request.user.username)) as User;
    // console.log(
    //   '🚀 ~ file: admin.guard.ts:14 ~ AdminGuard ~ canActivate ~ user:',
    //   user,
    // );
    // 3. 判断用户是否有权限
    // roles 2：普通用户 1：管理员 示例代码
    if (user.roles.filter((o) => o.id === 2).length > 0) {
      return true;
    }
    return false;
  }
}
