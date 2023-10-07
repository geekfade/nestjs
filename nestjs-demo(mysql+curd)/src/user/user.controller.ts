import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getUserDto } from './dto/get-user.dto';

@Controller('user/')
export class UserController {
  // private logger = new Logger(UserController.name);
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    // private logger: Logger,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.warn('UserController init');
  }

  @Get('info/:id')
  getUser(): any {
    return 'hello user';
  }

  @Get('get')
  getUsers(@Query() query: getUserDto): any {
    // 前端传递的参数的类型默认都是string，需要转换
    // page: 1, limit: 10，condition: { username,roles,profile,gender,age }，sort: { username: 'desc' }
    // const user = { isAdmin: false };
    // if (!user.isAdmin) {
    //   // throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
    //   throw new UnauthorizedException('用户不存在');
    // }
    // return this.userService.getUsers();
    // this.logger.log('请求了getUsers');
    // this.logger.warn('请求了getUsers');
    // this.logger.error('请求了getUsers');
    // this.logger.debug('请求了getUsers');
    // this.logger.verbose('请求了getUsers');
    return this.userService.findAll(query);
  }

  // @Post('add')
  // async addUser(@Headers() user: User) {
  //   console.log(
  //     '🚀 ~ file: user.controller.ts:56 ~ UserController ~ addUser ~ user:',
  //     user,
  //   );
  //   return await this.userService.create(user);
  // }

  @Post()
  async addUser(@Body() dto: User, @Req() req: any) {
    console.log(
      'dto ~ file: user.controller.ts:56 ~ UserController ~ addUser ~ user:',
      dto,
    );
    return await this.userService.create(dto);
  }

  @Patch(':id')
  updateUser(@Body() dto: any, @Param() id: number) {
    return this.userService.update(id, dto);
  }
  // @Post('update')
  // updateUser(@Body() user: User) {
  //   return this.userService.update(user.id, user);
  // }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  // @Get('delete')
  // deleteUser(@Query('id') id: number) {
  //   return this.userService.remove(id);
  // }

  @Get('profile')
  getUserProfile(@Query() query: any) {
    console.log(
      '🚀 ~ file: user.controller.ts:98 ~ UserController ~ getUserProfile ~ query:',
      query,
    );
    return this.userService.findUserProfile(5);
  }

  @Get('logs')
  getUserLogs() {
    return this.userService.findUserLogs(5);
  }

  @Get('logsByGroup')
  async getUserLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(5);
    return res.map((item) => ({
      result: item.result,
      count: item.count,
    }));
  }
}
