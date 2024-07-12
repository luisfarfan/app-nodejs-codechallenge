import { CreateTransactionDto } from '../../dto/create-transaction.dto';
import { Transaction } from '../../../entities/transaction.entity';

export interface TransactionRepositoryAdapter {
  create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;

  findOne(id: string): Promise<Transaction>;

  updateStatus(
    id: string,
    status: 'pending' | 'approved' | 'rejected'
  ): Promise<Transaction>;
}
