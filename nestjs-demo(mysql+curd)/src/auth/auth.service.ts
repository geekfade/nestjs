import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { getUserDto } from '../user/dto/get-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async signin(username: string, password: string) {
    // const res = await this.userService.findAll({ username } as getUserDto);
    const user = await this.userService.find(username);
    if (!user) {
      throw new ForbiddenException('用户名不存在');
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      throw new ForbiddenException('用户名或密码错误');
    }
    return await this.jwt.signAsync(
      {
        username: user.username,
        sub: user.id,
      },
      // 局部配置-> refresh token
      // {
      //   expiresIn: '1d',
      // },
    );

    // if (user && user.password === password) {
    //   return await this.jwt.signAsync(
    //     {
    //       username: user.username,
    //       sub: user.id,
    //     },
    //     // 局部配置-> refresh token
    //     // {
    //     //   expiresIn: '1d',
    //     // },
    //   );
    // }
  }
  async signup(username: string, password: string) {
    const user = await this.userService.find(username);
    if (user) {
      throw new ForbiddenException('用户名已存在');
    }
    const res = await this.userService.create({
      username,
      password,
    });
    return res;
  }
}
