import { IsEnum, IsUUID } from 'class-validator';
import { TransactionStatusEnum } from '../../enums/transaction-status.enum';

export class FraudStatusUpdateDto {
  @IsUUID()
  transactionId: string;

  @IsEnum(TransactionStatusEnum)
  status: TransactionStatusEnum;
}
