import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers() {
    const env = this.configService.get('DB');
    const dbPort = this.configService.get('DB_PORT');
    console.log(
      '🚀 ~ file: user.controller.ts:16 ~ UserController ~ getUsers ~ dbPort:',
      dbPort,
    );
    console.log(
      '🚀 ~ file: user.controller.ts:15 ~ UserController ~ getUsers ~ env:',
      env,
    );
    return this.userService.getUsers();
  }
}
