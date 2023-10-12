import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../enum/config';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    // JwtModule.register({
    //   secret:
    //     'AKZIUC&qeu$ligTbMt3@8Yfg2hAWnJM(62Sk6ppZlaVcThAnaS3GJvJ#8JBl1SIHj2pD@v4HcDWYIs@Dw)a!~z%!',
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ConfigEnum.SECRET),
        signOptions: {
          expiresIn: configService.get<string>(ConfigEnum.EXPIRESIN),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
