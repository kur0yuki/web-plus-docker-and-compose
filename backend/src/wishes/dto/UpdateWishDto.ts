import {IsNumber, IsOptional, IsUrl, Length} from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateWishDto {
  @IsOptional()
  name: string;

  @IsUrl()
  @IsOptional()
  link: string;

  @IsUrl()
  @IsOptional()
  image: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price: number;

  @Length(1, 1024)
  @IsOptional()
  description: string;

  @Exclude()
  @IsOptional()
  raised: number;
}
