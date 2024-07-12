import { CommandHandler, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../commands/create-transaction.command';
import { Inject } from '@nestjs/common';
import { ITransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { Transaction } from '../../infraestructure/entities/transaction.entity';
import { KafkaService } from '../../../infraestructure/kafka/kafka.service';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    private kafkaService: KafkaService
  ) {}

  async execute(command: CreateTransactionCommand): Promise<Transaction> {
    const {
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferTypeId,
      amount,
    } = command;
    console.log('CreateTransactionCommand', command);
    const transaction = await this.transactionRepository.create({
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferTypeId,
      value: amount,
    });

    this.kafkaService
      .sendMessage('transaction-created', transaction)
      .subscribe();

    return transaction;
  }
}
