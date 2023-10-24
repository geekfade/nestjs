import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { ConfigEnum } from './src/enum/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// 通过环境变量获取数据库配置,dotenv解析.env文件

function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync('.env')) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {};
}

function buildConnectionOptions() {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);
  const config = {
    ...defaultConfig,
    ...envConfig,
  };
  const entitiesDir =
    process.env.NODE_ENV === 'test'
      ? [__dirname + '/**/*.entity.ts']
      : [__dirname + '/**/*.entity{.ts,.js}'];

  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: entitiesDir,
    synchronize: true, // 同步
    autoLoadEntities: true, // 自动加载实体
    // logging: ['error', 'warn'],
    logging: process.env.NODE_ENV === 'development',
    // logging: false, // 打印错误日志
    // migrations: ['src/migrations/*.ts'],
    // cli: {
    //   migrationsDir: 'src/migrations',
    // },
  } as TypeOrmModuleOptions;
}

export const connectionParams = buildConnectionOptions();

export default new DataSource({
  ...(connectionParams as DataSourceOptions),
  migrations: ['src/migrations/**'],
  subscribers: [],
});
