import { IsDate, IsEmail, IsNumber, IsUrl, Length } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from '../entities/users.entity';

export class UserProfileResponseDto {
  constructor(user: User) {
    Object.assign(this, user);
  }
  @IsNumber()
  id: number;
  @Length(1, 64)
  username: string;
  @Length(1, 200)
  about: string;
  @IsUrl()
  avatar: string;
  @IsEmail()
  email: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
  @Exclude()
  password: string;
}
