import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logs } from 'src/logs/logs.entity';
import { Roles } from 'src/roles/roles.entity';
import { Profile } from 'src/user/profile.entity';
import { User } from 'src/user/user.entity';

export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'geeking',
  database: 'testdb',
  entities: [User, Profile, Logs, Roles],
  synchronize: true, // 同步
  autoLoadEntities: true, // 自动加载实体
  // logging: ['error', 'warn'],
  logging: false, // 打印错误日志
} as TypeOrmModuleOptions;
