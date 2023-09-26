import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    const password =
      process.env.DB_PASS || this.configService.get(ConfigEnum.DB_PASS);

    console.log(
      '🚀 ~ file: user.controller.ts:16 ~ UserController ~ getUsers ~ password:',
      password,
    );

    return this.userService.getUsers();
  }
}
