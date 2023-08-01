import { IsEmail, IsOptional, IsUrl, Length } from 'class-validator';

export class SignUpUserDto {
  @Length(1, 64)
  username: string;
  @Length(2)
  password: string;
  @IsEmail()
  email: string;
  @IsUrl()
  @IsOptional()
  avatar: string;
  @Length(0, 200)
  @IsOptional()
  description: string;
}
