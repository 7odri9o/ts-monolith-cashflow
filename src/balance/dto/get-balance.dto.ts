import { IsDateString, IsOptional, Validate } from 'class-validator';
import { IsDateInValidFormatValidation } from '@/validation';

export class GetBalanceDto {
  @IsDateString({ strict: true })
  @IsOptional()
  @Validate(IsDateInValidFormatValidation)
  date: string;
}
