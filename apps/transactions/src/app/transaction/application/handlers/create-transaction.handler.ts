import { CommandHandler, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../commands/create-transaction.command';
import { Inject } from '@nestjs/common';
import { ITransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { Transaction } from '../../infraestructure/entities/transaction.entity';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(command: CreateTransactionCommand): Promise<Transaction> {
    const {
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferTypeId,
      amount,
    } = command;
    return await this.transactionRepository.create({
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferTypeId,
      value: amount,
    });
  }
}
