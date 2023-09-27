import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
  NotFoundException,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

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

  @Get('get')
  getUsers() {
    // const user = { isAdmin: false };
    // if (!user.isAdmin) {
    //   // throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
    //   throw new UnauthorizedException('用户不存在');
    // }
    // return this.userService.getUsers();
    this.logger.log('请求了getUsers');
    this.logger.warn('请求了getUsers');
    // this.logger.error('请求了getUsers');
    // this.logger.debug('请求了getUsers');
    // this.logger.verbose('请求了getUsers');
    return this.userService.findAll();
  }

  @Post('add')
  async addUser(@Body() user: User) {
    return await this.userService.create(user);
  }

  @Post('update')
  updateUser(@Body() user: User) {
    return this.userService.update(user.id, user);
  }

  @Get('delete')
  deleteUser(@Query('id') id: number) {
    return this.userService.remove(id);
  }

  @Get('profile')
  getUserProfile() {
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
