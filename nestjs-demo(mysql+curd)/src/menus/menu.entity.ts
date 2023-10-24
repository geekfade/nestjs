import { Roles } from '../roles/roles.entity';
import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

export class Menus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  order: number;

  @Column()
  acl: string;

  // 一个菜单对应多个角色及权限
  @ManyToMany(() => Roles, (role) => role.menus)
  @JoinTable({ name: 'role_menu' })
  role: Roles;
}
