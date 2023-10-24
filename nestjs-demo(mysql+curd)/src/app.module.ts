import { Global, Logger, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from './logs/logs.module';
import { connectionParams } from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';
import { RolesModule } from './roles/roles.module';
import { MenusModule } from './menus/menus.module';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: 'env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        // DB_URL: Joi.string().domain(),
        DB_PORT: Joi.number().default(3306),
        DB_HOST: Joi.alternatives().try(
          Joi.string().domain(),
          Joi.string().ip(),
        ),
        DB_TYPE: Joi.string().valid('mysql', 'postgres'),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
        LOG_LEVEL: Joi.string(),
        LOG_ON: Joi.boolean(),
        // DB_PORT: Joi.number().valid(3306, 5432),
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST,
    //   port: 3306,
    //   username: 'admin',
    //   password: 'geeking',
    //   database: process.env.DB_NAME,
    //   entities: [],
    //   synchronize: true, // 同步
    //   autoLoadEntities: true, // 自动加载实体
    //   logging: ['error'], // 打印错误日志
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) =>
    //     ({
    //       type: configService.get(ConfigEnum.DB_TYPE),
    //       host: configService.get(ConfigEnum.DB_HOST),
    //       port: configService.get(ConfigEnum.DB_PORT),
    //       username: configService.get(ConfigEnum.DB_USER),
    //       password: configService.get(ConfigEnum.DB_PASS),
    //       database: configService.get(ConfigEnum.DB_NAME),
    //       entities: [User, Profile, Logs, Roles],
    //       synchronize: true, // 同步
    //       autoLoadEntities: true, // 自动加载实体
    //       // logging: ['error', 'warn'],
    //       logging: false, // 打印错误日志
    //     }) as TypeOrmModuleOptions,
    // }),
    TypeOrmModule.forRoot(connectionParams),
    UserModule,
    LogsModule,
    RolesModule,
    AuthModule,
    MenusModule,
  ],
  controllers: [],
  providers: [
    Logger,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtGuard,
    // },
  ],
  exports: [Logger],
})
export class AppModule {}
