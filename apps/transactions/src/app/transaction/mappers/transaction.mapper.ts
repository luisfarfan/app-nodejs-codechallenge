import { Transaction } from '../../entities/transaction.entity';
import { TransactionResponseDto } from '../dto/transaction-response.dto';

export class TransactionMapper {
  static toRetrieveResponseDto(
    transaction: Transaction
  ): TransactionResponseDto {
    return {
      transactionExternalId: transaction.id,
      transactionType: { name: 'transfer' },
      transactionStatus: { name: transaction.lastStatus.status },
      value: transaction.value,
      createdAt: transaction.createdAt.toISOString(),
    };
  }
}
