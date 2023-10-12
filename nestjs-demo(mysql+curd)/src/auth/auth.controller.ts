import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeormFilter } from '../filters/typeorm.filter';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('auth')
@UseFilters(new TypeormFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    const token = await this.authService.signin(username, password);
    return {
      access_token: token,
    };
  }

  @Post('/signup')
  signup(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }
}
