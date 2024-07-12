import { ITransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionStatusEntity } from '../entities/transaction-status.entity';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { TransactionStatusEnum } from '../../enums/transaction-status.enum';
import { Transaction } from '../../domain/aggregates/transaction';

@Injectable()
export class OrmTransactionSqlRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
    @InjectRepository(TransactionStatusEntity)
    private readonly transactionStatusRepository: Repository<TransactionStatusEntity>
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

    return new Transaction({
      transactionExternalId: savedTransaction.id,
      transactionType: savedTransaction.transferTypeId,
      transactionStatus: savedTransaction.lastStatus.status,
      value: savedTransaction.value,
      createdAt: savedTransaction.createdAt,
    });
  }

  async getById(id: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: {
        id,
      },
    });
    transaction.lastStatus = await this.getLastTransactionStatus(id);

    return new Transaction({
      transactionExternalId: transaction.id,
      transactionType: transaction.transferTypeId,
      transactionStatus: transaction.lastStatus.status,
      value: transaction.value,
      createdAt: transaction.createdAt,
    });
  }

  async getLastTransactionStatus(
    transactionId: string
  ): Promise<TransactionStatusEntity> {
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
