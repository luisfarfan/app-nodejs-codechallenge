import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { TransactionStatusEnum } from '../../enums/transaction-status.enum';
import { Transaction } from '../aggregates/transaction';

export interface ITransactionRepository {
  create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;

  getById(id: string): Promise<Transaction>;

  updateStatus(id: string, status: TransactionStatusEnum): Promise<Transaction>;
}
