import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTransactionDto } from './application/dto/create-transaction.dto';
import { TransactionResponseDto } from './application/dto/transaction-response.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FraudStatusUpdateDto } from './application/dto/fraud-status-update.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTransactionQuery } from './application/queries/get-transaction.query';
import { CreateTransactionCommand } from './application/commands/create-transaction.command';
import { UpdateTransactionStatusCommand } from './application/commands/update-transaction-status.command';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}
  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto
  ): Promise<TransactionResponseDto> {
    const {
      accountExternalIdDebit,
      accountExternalIdCredit,
      value,
      transferTypeId,
    } = createTransactionDto;
    const command = new CreateTransactionCommand(
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferTypeId,
      value
    );
    return await this.commandBus.execute(command);
  }

  @Get(':transactionId')
  async findOne(
    @Param('transactionId') transactionId: string
  ): Promise<TransactionResponseDto> {
    const query = new GetTransactionQuery(transactionId);
    return await this.queryBus.execute(query);
  }

  @MessagePattern('transaction-validated')
  async handleTransactionUpdated(@Payload() message: FraudStatusUpdateDto) {
    console.log('Transaction validated MESSAGE', message);
    const query = new UpdateTransactionStatusCommand(
      message.transactionId,
      message.status
    );
    await this.queryBus.execute(query);
  }
}
