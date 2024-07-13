import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTransactionQuery } from '../queries/get-transaction.query';
import { Inject } from '@nestjs/common';
import { ITransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { TransactionMapper } from '../../mappers/transaction.mapper';
import { TransactionResponseDto } from '../dto/transaction-response.dto';

@QueryHandler(GetTransactionQuery)
export class GetTransactionHandler
  implements IQueryHandler<GetTransactionQuery>
{
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(query: GetTransactionQuery): Promise<TransactionResponseDto> {
    const transaction = await this.transactionRepository.getById(
      query.transactionId
    );
    return TransactionMapper.toRetrieveResponseDto(transaction);
  }
}
