import { TransactionStatusEnum } from '../enums/transaction-status.enum';

export interface ITransaction {
  transactionExternalId: string;

  transactionType: number;

  transactionStatus: TransactionStatusEnum;

  value: number;

  createdAt: Date;
}
