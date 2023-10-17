import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  path: string;

  @Column()
  method: string;

  @Column()
  data?: string;

  @Column()
  result: number;

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn()
  user: User;
}
