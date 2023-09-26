import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers() {
    return {
      code: 200,
      message: '请求成功',
      data: [],
    };
  }
}
