import { TransactionRepository } from './infraestructure/repository/transaction.repository';
import { CreateTransactionDto } from './application/dto/create-transaction.dto';
import { TransactionResponseDto } from './application/dto/transaction-response.dto';
import { TransactionStatusEnum } from './enums/transaction-status.enum';
import { TransactionMapper } from './mappers/transaction.mapper';
import { Injectable } from '@nestjs/common';
import { KafkaService } from '../infraestructure/kafka/kafka.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly kafkaService: KafkaService
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto
  ): Promise<TransactionResponseDto> {
    const createdTransaction = await this.transactionRepository.create(
      createTransactionDto
    );

    this.kafkaService
      .sendMessage('transaction-created', createdTransaction)
      .subscribe();

    return TransactionMapper.toRetrieveResponseDto(createdTransaction);
  }

  async findById(id: string): Promise<TransactionResponseDto> {
    const transaction = await this.transactionRepository.findOne(id);
    return TransactionMapper.toRetrieveResponseDto(transaction);
  }

  async updateStatus(id: string, status: TransactionStatusEnum): Promise<void> {
    await this.transactionRepository.updateStatus(id, status);
  }
}
