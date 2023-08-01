import { IsBoolean, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @Min(1)
  amount: number;
  @IsBoolean()
  @IsOptional()
  hidden: boolean;
  @IsInt()
  itemId: number;
}
