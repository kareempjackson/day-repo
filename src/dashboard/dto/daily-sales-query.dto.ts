import { IsOptional, IsDateString } from 'class-validator';

export class DailySalesQueryDto {
  @IsOptional()
  @IsDateString()
  date?: string;
}
