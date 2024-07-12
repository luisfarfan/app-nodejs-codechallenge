import { TransactionRepositoryAdapter } from '../adapters/transaction-repository.adapter';
import { Transaction } from '../../entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';

export class TransactionRepository implements TransactionRepositoryAdapter {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto
  ): Promise<Transaction> {
    const transaction = this.transactionsRepository.create({
      ...createTransactionDto,
      status: 'pending',
    });
    return this.transactionsRepository.save(transaction);
  }

  async findOne(id: string): Promise<Transaction> {
    return this.transactionsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateStatus(
    id: string,
    status: 'pending' | 'approved' | 'rejected'
  ): Promise<Transaction> {
    await this.transactionsRepository.update(id, { status });
    return this.findOne(id);
  }
}
