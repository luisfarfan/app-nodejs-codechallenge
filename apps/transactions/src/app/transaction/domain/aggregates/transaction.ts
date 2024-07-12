import { TransactionStatusEnum } from '../../enums/transaction-status.enum';
import { AggregateRoot } from '@nestjs/cqrs';
import { ITransaction } from '../transaction.interface';

export class Transaction extends AggregateRoot {
  private readonly transactionExternalId: string;
  private readonly transactionType: number;
  private readonly transactionStatus: TransactionStatusEnum;
  private readonly value: number;

  private readonly createdAt: Date;

  constructor(transaction: ITransaction) {
    super();
    this.transactionExternalId = transaction.transactionExternalId;
    this.transactionType = transaction.transactionType;
    this.transactionStatus = transaction.transactionStatus;
    this.value = transaction.value;
    this.createdAt = transaction.createdAt;
  }
}
