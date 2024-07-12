import { TransactionStatusEnum } from '../../enums/transaction-status.enum';

export class UpdateTransactionStatusCommand {
  constructor(
    public readonly transactionId: string,
    public readonly status: TransactionStatusEnum
  ) {}
}
