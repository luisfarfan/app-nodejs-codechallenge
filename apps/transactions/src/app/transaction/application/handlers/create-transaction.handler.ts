import { CommandHandler, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../commands/create-transaction.command';
import { Inject } from '@nestjs/common';
import { ITransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { TransactionEntity } from '../../infraestructure/entities/transaction.entity';
import { KafkaService } from '../../../kafka/kafka.service';
import { Transaction } from '../../domain/aggregates/transaction';
import { TransactionMapper } from '../../mappers/transaction.mapper';
import { TransactionResponseDto } from '../dto/transaction-response.dto';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    private kafkaService: KafkaService
  ) {}

  async execute(
    command: CreateTransactionCommand
  ): Promise<TransactionResponseDto> {
    const {
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferTypeId,
      amount,
    } = command;
    const transaction = await this.transactionRepository.create({
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferTypeId,
      value: amount,
    });

    this.kafkaService
      .sendMessage('transaction-created', transaction)
      .subscribe();

    return TransactionMapper.toRetrieveResponseDto(transaction);
  }
}
