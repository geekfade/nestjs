import { IsString, IsNotEmpty, Length } from 'class-validator';

export class SigninUserDto {
  @IsString({
    message: '用户名不能是纯数字',
  })
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  // @Length(6, 20, {
  //   // $value:当前用户传入的值
  //   // $property:当前验证的属性
  //   // $target:当前验证的对象
  //   // $constraint1:当前验证的第一个约束
  //   // $constraint2:当前验证的第二个约束
  //   message: `用户名长度必须在$constraint1和$constraint2之间，当前值为：$value`,
  // })
  username: string;

  @IsString()
  @IsNotEmpty()
  // @Length(6, 64)
  password: string;
}
