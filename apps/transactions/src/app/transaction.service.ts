import { TransactionRepository } from './transaction/infraestructure/repository/transaction.repository';
import { CreateTransactionDto } from './transaction/dto/create-transaction.dto';
import { TransactionResponseDto } from './transaction/dto/transaction-response.dto';
import { TransactionStatusEnum } from './transaction/enums/transaction-status.enum';
import { TransactionMapper } from './transaction/mappers/transaction.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async create(
    createTransactionDto: CreateTransactionDto
  ): Promise<TransactionResponseDto> {
    const createdTransaction = await this.transactionRepository.create(
      createTransactionDto
    );

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
