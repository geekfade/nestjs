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
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getUserDto } from './dto/get-user.dto';
import { TypeormFilter } from '../filters/typeorm.filter';
import { CreateUserPipe } from './pipes/create-user/create-user.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminGuard } from '../guards/admin/admin.guard';
import { UpdateGuard } from '../guards/update/update.guard';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('user')
@UseFilters(new TypeormFilter())
// @UseGuards(AuthGuard('jwt'))
@UseGuards(JwtGuard)
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

  @Get('/get')
  // 1.装饰器的顺序，方法如果有多个装饰器，从下到上执行
  // 2.如果使用UseGuards传递多个守卫，则从左到右执行，如果前面的Guard没有通过，则后面的Guard不会执行
  // @UseGuards(AdminGuard)
  @UseGuards(AdminGuard)
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
  addUser(@Body(CreateUserPipe) dto: CreateUserDto) {
    const user = dto as User;
    return this.userService.create(user);
  }

  @Patch('/:id')
  @UseGuards(UpdateGuard)
  updateUser(
    @Body() dto: User,
    @Param('id') id: number,
    @Headers('Authorization') headers: any,
  ) {
    // 判断用户是否存在，判断用户是否有权限
    if (id === headers) {
      return this.userService.update(id, dto);
    } else {
      throw new UnauthorizedException('用户不存在');
    }
  }
  // @Post('update')
  // updateUser(@Body() user: User) {
  //   return this.userService.update(user.id, user);
  // }

  @Delete('/:id')
  removeUser(@Param('id') id: number): any {
    return this.userService.remove(id);
  }

  // @Get('delete')
  // deleteUser(@Query('id') id: number) {
  //   console.log(
  //     '🚀 ~ file: user.controller.ts:103 ~ UserController ~ deleteUser ~ id:',
  //     id,
  //   );
  //   return this.userService.remove(id);
  // }

  @Get('/profile')
  // @UseGuards(AuthGuard('jwt'))
  getUserProfile(
    @Query('id', ParseIntPipe) id: any,
    // 通过jwt验证后，会将用户信息存储在req.user中,passport-jwt的配置
    // @Req() req,
  ) {
    // console.log(
    //   '🚀 ~ file: auth.controller.ts:26 ~ AuthController ~ signup ~ req:',
    //   req.user,
    // );
    return this.userService.findUserProfile(id);
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
