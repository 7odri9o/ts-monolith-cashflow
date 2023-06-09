import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCashInDto {
  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsDate()
  date: Date = new Date();
}
