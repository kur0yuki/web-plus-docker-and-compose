import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateWishlistDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsUrl()
  image: string;
  @IsOptional()
  @IsNumber({}, { each: true })
  itemsId: number[];
}
