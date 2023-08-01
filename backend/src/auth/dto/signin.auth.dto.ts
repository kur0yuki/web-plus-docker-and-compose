import { Length } from 'class-validator';

export class SignInUserDto {
  @Length(1, 64)
  username: string;
  @Length(2)
  password: string;
}
