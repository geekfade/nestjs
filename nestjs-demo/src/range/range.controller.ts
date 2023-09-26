import { Controller, Get, Query } from '@nestjs/common';
import { RangeService } from './range.service';

@Controller('range')
export class RangeController {
  constructor(private rangeService: RangeService) {}

  @Get()
  getRanges(@Query('num') num: number): any {
    return this.rangeService.getRanges(num);
  }
}
