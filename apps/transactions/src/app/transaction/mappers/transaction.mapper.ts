import { TransactionResponseDto } from '../application/dto/transaction-response.dto';
import { Transaction } from '../domain/aggregates/transaction';

export class TransactionMapper {
  static toRetrieveResponseDto(
    transaction: Transaction
  ): TransactionResponseDto {
    return {
      transactionExternalId: transaction.getTransactionExternalId(),
      transactionType: { name: 'transfer' },
      transactionStatus: { name: transaction.getTransactionStatus() },
      value: transaction.getValue(),
      createdAt: transaction.getCreatedAt().toISOString(),
    };
  }
}
