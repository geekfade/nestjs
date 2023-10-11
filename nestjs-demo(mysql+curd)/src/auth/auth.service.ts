import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { getUserDto } from '../user/dto/get-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signin(username: string, password: string) {
    const res = await this.userService.findAll({ username } as getUserDto);
    return res;
  }
  signup(username: string, password: string) {
    return { username, password };
  }
}
