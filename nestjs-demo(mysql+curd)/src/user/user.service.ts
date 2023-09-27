import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Logs } from 'src/logs/logs.entity';

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

  findAll() {
    return this.userRepository.find();
  } // find方法不接收参数，表示查询所有数据

  find(username: string) {
    return this.userRepository.find({ where: { username } });
  } // find方法接收一个参数，要查询的数据

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  } // findOne方法接收一个参数，要查询的id

  async create(user: User) {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
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
