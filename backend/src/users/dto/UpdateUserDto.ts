import { IsEmail, IsOptional, IsUrl, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(1, 64)
  @IsOptional()
  username?: string;
  @Length(1, 200)
  @IsOptional()
  about?: string;
  @IsUrl()
  @IsOptional()
  avatar?: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @Length(1)
  @IsOptional()
  password?: string;
}
