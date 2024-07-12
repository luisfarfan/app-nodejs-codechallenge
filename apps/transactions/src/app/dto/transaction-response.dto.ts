import {
  IsUUID,
  IsNumber,
  IsString,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class TransactionTypeDto {
  @IsString()
  name: string;
}

class TransactionStatusDto {
  @IsString()
  name: string;
}

export class TransactionResponseDto {
  @IsUUID()
  transactionExternalId: string;

  @ValidateNested()
  @Type(() => TransactionTypeDto)
  transactionType: TransactionTypeDto;

  @ValidateNested()
  @Type(() => TransactionStatusDto)
  transactionStatus: TransactionStatusDto;

  @IsNumber()
  value: number;

  @IsDateString()
  createdAt: string;
}
