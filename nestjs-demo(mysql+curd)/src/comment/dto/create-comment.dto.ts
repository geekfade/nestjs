import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  uid: string;
  @IsNotEmpty()
  avatar?: string;
  @IsNotEmpty()
  username?: string;
  @IsNotEmpty()
  time: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  like?: number;
}
