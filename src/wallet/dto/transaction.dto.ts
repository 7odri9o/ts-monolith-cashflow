import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class TransactionDto {
  @IsNumber()
  value: number;

  @IsDate()
  @Type(() => Date)
  date: Date;
}
