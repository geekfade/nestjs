import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers(): any {
    return {
      code: 0,
      data: [],
      msg: '请求成功',
    };
  }
}
