import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTransactionQuery } from '../queries/get-transaction.query';
import { Inject } from '@nestjs/common';
import { ITransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { Transaction } from '../../infraestructure/entities/transaction.entity';

@QueryHandler(GetTransactionQuery)
export class GetTransactionHandler
  implements IQueryHandler<GetTransactionQuery>
{
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(query: GetTransactionQuery): Promise<Transaction> {
    return this.transactionRepository.getById(query.transactionId);
  }
}
