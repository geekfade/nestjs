import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Logs } from '../logs/logs.entity';
import { getUserDto } from './dto/get-user.dto';
import { conditionUtils } from 'src/utils/db.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
  ) {}
  // async getUsers() {
  //   const res = await this.userRepository.find(); // 查询所有数据
  //   console.log(res);
  //   return {
  //     code: 200,
  //     message: '获取用户列表成功',
  //     data: res,
  //   };
  // }

  // addUser() {
  //   return {
  //     code: 200,
  //     message: '添加用户成功',
  //     data: [],
  //   };
  // }

  findAll(query: getUserDto) {
    const { limit, page, username, gender, role } = query;
    const take = limit || 10;
    const skip = (page || 1 - 1) * 0;
    // SELECT * FROM user u, profile p WHERE u.id = p.userId AND u.id=r.userId and ...
    // SELECT * FROM user u LEFT JOIN profile p ON u.id = p.userId WHERE u.id=r.userId and ...
    // 分页查询 limit offset
    // return this.userRepository.find({
    //   select: {
    //     id: true,
    //     username: true,
    //     profile: {
    //       gender: true,
    //     },
    //     roles: {
    //       name: true,
    //     },
    //   },
    //   relations: {
    //     profile: true,
    //     roles: true,
    //   },
    //   where: {
    //     username,
    //     profile: {
    //       gender,
    //     },
    //     roles: {
    //       id: role,
    //     },
    //   },
    //   take,
    //   skip, // 从第几条数据开始查询
    // });
    let obj = {
      'user.username': username,
      'profile.gender': gender,
      'roles.id': role,
    };
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles');

    const newQuery = conditionUtils<User>(queryBuilder, obj);

    return (
      newQuery
        .take(take)
        .skip(skip)
        // .andWhere('profile.gender = :gender', { gender })
        // .andWhere('roles.id = :role', { role })
        .getMany()
    );
  } // find方法不接收参数，表示查询所有数据

  find(username: string) {
    return this.userRepository.find({ where: { username } });
  } // find方法接收一个参数，要查询的数据

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  } // findOne方法接收一个参数，要查询的id

  async create(user: User) {
    const newUser = await this.userRepository.create(user);
    const res = await this.userRepository.save(newUser);
    return res;
    // try {
    // } catch (error) {
    //   if (error?.errno && error?.errno === 1062) {
    //     throw new HttpException(error?.sqlMessage, 500);
    //   }
    // }
  } // create方法接收一个参数，要创建的数据

  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user); // update方法接收两个参数，第一个是要更新的id，第二个是要更新的数据
  } // Partial<User> 表示User的部分属性

  async remove(id: number) {
    // 删除数据，判断是否删除成功
    const { affected } = await this.userRepository.delete(id);
    if (affected === 0) {
      return {
        code: 400,
        message: '删除用户失败',
      };
    } else {
      return {
        code: 200,
        message: '删除用户成功',
      };
    }
  } // delete方法接收一个参数，要删除的id

  findUserProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
  } // 通过用户id查询用户的个人信息

  async findUserLogs(id: number) {
    const user = await this.findOne(id);
    return this.logsRepository.find({
      where: { user },
      // relations: {
      //   user: true,
      // },
    });
  } // 通过用户id查询用户的所有日志

  findLogsByGroup(id: number) {
    return (
      this.logsRepository
        .createQueryBuilder('logs')
        .select('logs.result', 'result')
        .addSelect('COUNT("logs.result")', 'count')
        .leftJoinAndSelect('logs.user', 'user')
        .where('user.id = :id', { id })
        .groupBy('logs.result')
        // .orderBy('result', 'DESC')
        .orderBy('count', 'DESC')
        .addOrderBy('result', 'DESC')
        .offset(2)
        .limit(2)
        .getRawMany()
    );
  } // 通过用户id查询用户的所有日志，并且按照日志的结果分组，统计每个结果的数量
}
