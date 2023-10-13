import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin/admin.guard';
import { IsNotEmpty, IsString } from 'class-validator';

class LogsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  id: string;
}

@Controller('logs')
// @UseGuards(JwtGuard, AdminGuard)
export class LogsController {
  @Get()
  getTest() {
    return 'hello logs';
  }
  @Post()
  postTest(@Body() dto: LogsDto) {
    console.log(
      '🚀 ~ file: logs.controller.ts:14 ~ LogsController ~ postTest ~ dto:',
      dto,
    );
    return 'hello logs';
  }
}
