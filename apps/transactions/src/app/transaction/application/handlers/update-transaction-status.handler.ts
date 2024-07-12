import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTransactionStatusCommand } from '../commands/update-transaction-status.command';
import { ITransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { Inject } from '@nestjs/common';
import { Transaction } from '../../infraestructure/entities/transaction.entity';

@CommandHandler(UpdateTransactionStatusCommand)
export class UpdateTransactionStatusHandler
  implements ICommandHandler<UpdateTransactionStatusCommand>
{
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(command: UpdateTransactionStatusCommand): Promise<Transaction> {
    const { transactionId, status } = command;
    return await this.transactionRepository.updateStatus(transactionId, status);
  }
}
