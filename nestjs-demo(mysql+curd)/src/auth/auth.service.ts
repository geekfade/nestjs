import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { getUserDto } from '../user/dto/get-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async signin(username: string, password: string) {
    // const res = await this.userService.findAll({ username } as getUserDto);
    const user = await this.userService.find(username);

    if (user && user.password === password) {
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
    }
    throw new UnauthorizedException();
  }
  async signup(username: string, password: string) {
    const res = await this.userService.create({
      username,
      password,
    });
    return res;
  }
}
