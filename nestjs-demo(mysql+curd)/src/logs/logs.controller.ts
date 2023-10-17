import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin/admin.guard';
import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Serialize } from '../decorators/serialize.interceptor';

class LogsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  id: string;
}

class PublicLogsDto {
  @Expose()
  name: string;
}

@Controller('logs')
@UseGuards(JwtGuard, AdminGuard)
// UseInterceptors(new SerializeInterceptor(DTO))
export class LogsController {
  @Get()
  getTest() {
    return 'hello logs';
  }
  @Post()
  @Serialize(PublicLogsDto)
  // @UseInterceptors(new SerializeInterceptor(Logs))
  postTest(@Body() dto: LogsDto) {
    console.log(
      '🚀 ~ file: logs.controller.ts:14 ~ LogsController ~ postTest ~ dto:',
      dto,
    );
    return dto;
  }
}
