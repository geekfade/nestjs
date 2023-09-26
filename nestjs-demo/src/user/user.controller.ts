import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
// import { ConfigEnum } from 'src/enum/config';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    // this.userService = userService;
  }

  @Get()
  getUsers(): any {
    // const db = this.configService.get(ConfigEnum.DB);
    // console.log(
    //   '🚀 ~ file: user.controller.ts:17 ~ UserController ~ getUsers ~ db:',
    //   db,
    // );
    // const url = this.configService.get('DB_URL');
    // console.log(
    //   '🚀 ~ file: user.controller.ts:23 ~ UserController ~ getUsers ~ url:',
    //   url,
    // );

    const data = this.configService.get('db1');
    console.log(
      '🚀 ~ file: user.controller.ts:29 ~ UserController ~ getUsers ~ data:',
      data,
    );
    return this.userService.getUsers();
  }

  @Post()
  addUser(): any {
    return this.userService.addUser();
  }
}
