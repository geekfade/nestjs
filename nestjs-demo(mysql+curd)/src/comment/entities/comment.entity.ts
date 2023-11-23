import { Transform } from 'class-transformer';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  avatar: string;

  @Column()
  username: string;

  @Column()
  @Transform(({ value }) => value.toLocaleString())
  time: string;

  @Column()
  content: string;

  @Column()
  like: number;
}
