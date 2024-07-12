import { ITransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionStatus } from '../entities/transaction-status.entity';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { TransactionStatusEnum } from '../../enums/transaction-status.enum';

@Injectable()
export class SqlRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    @InjectRepository(TransactionStatus)
    private readonly transactionStatusRepository: Repository<TransactionStatus>
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto
  ): Promise<Transaction> {
    const transaction = this.transactionsRepository.create({
      ...createTransactionDto,
    });
    const savedTransaction = await this.transactionsRepository.save(
      transaction
    );

    const initialTransactionStatus = this.transactionStatusRepository.create({
      transaction: savedTransaction,
      status: TransactionStatusEnum.PENDING,
    });
    await this.transactionStatusRepository.save(initialTransactionStatus);

    savedTransaction.lastStatus = initialTransactionStatus;

    return savedTransaction;
  }

  async getById(id: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: {
        id,
      },
    });
    transaction.lastStatus = await this.getLastTransactionStatus(id);

    return transaction;
  }

  async getLastTransactionStatus(
    transactionId: string
  ): Promise<TransactionStatus> {
    return this.transactionStatusRepository
      .createQueryBuilder('status')
      .where('status.transactionId = :transactionId', { transactionId })
      .orderBy('status.createdAt', 'DESC')
      .getOne();
  }

  async updateStatus(
    transactionId: string,
    status: TransactionStatusEnum
  ): Promise<Transaction> {
    const newStatus = this.transactionStatusRepository.create({
      transactionId,
      status,
    });
    await this.transactionStatusRepository.save(newStatus);

    return this.getById(transactionId);
  }
}
