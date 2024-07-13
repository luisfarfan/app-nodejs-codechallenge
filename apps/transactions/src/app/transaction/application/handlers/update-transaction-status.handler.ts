import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTransactionStatusCommand } from '../commands/update-transaction-status.command';
import { ITransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { Inject } from '@nestjs/common';
import { TransactionEntity } from '../../infraestructure/entities/transaction.entity';
import { Transaction } from '../../domain/aggregates/transaction';
import { TransactionMapper } from '../../mappers/transaction.mapper';
import { TransactionResponseDto } from '../dto/transaction-response.dto';

@CommandHandler(UpdateTransactionStatusCommand)
export class UpdateTransactionStatusHandler
  implements ICommandHandler<UpdateTransactionStatusCommand>
{
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(
    command: UpdateTransactionStatusCommand
  ): Promise<TransactionResponseDto> {
    const { transactionId, status } = command;
    const transaction = await this.transactionRepository.updateStatus(
      transactionId,
      status
    );
    return TransactionMapper.toRetrieveResponseDto(transaction);
  }
}
