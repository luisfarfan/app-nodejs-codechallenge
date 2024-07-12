import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { Transaction } from '../../infraestructure/entities/transaction.entity';
import { TransactionStatusEnum } from '../../enums/transaction-status.enum';

export interface ITransactionRepository {
  create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;

  getById(id: string): Promise<Transaction>;

  updateStatus(id: string, status: TransactionStatusEnum): Promise<Transaction>;
}
