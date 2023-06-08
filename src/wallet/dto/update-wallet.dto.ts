import { IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionDto } from './transaction.dto';

export class UpdateWalletDto {
  operation: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TransactionDto)
  transaction: TransactionDto;
}
