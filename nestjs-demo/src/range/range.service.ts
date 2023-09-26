import { Injectable } from '@nestjs/common';

@Injectable()
export class RangeService {
  /**
   * Returns an object containing an array of string ranges from 1 to the given number.
   * @param num - The number up to which the ranges should be generated.
   * @returns An object containing a code, data, and message property.
   */
  getRanges(num: number): any {
    if (!num) {
      return {
        code: 1,
        data: [],
        msg: '参数错误',
      };
    }
    const ranges = [];
    for (let i = 1; i <= num; i++) {
      ranges.push(`${i}`);
    }
    return {
      code: 0,
      data: ranges,
      msg: '请求成功',
    };
  }
}
