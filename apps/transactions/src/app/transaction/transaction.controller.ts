import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionsService } from './transaction.service';
import { CreateTransactionDto } from './application/dto/create-transaction.dto';
import { TransactionResponseDto } from './application/dto/transaction-response.dto';
import { KafkaService } from '../infraestructure/kafka/kafka.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FraudStatusUpdateDto } from './application/dto/fraud-status-update.dto';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private kafkaService: KafkaService
  ) {}
  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto
  ): Promise<TransactionResponseDto> {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TransactionResponseDto> {
    return this.transactionsService.findById(id);
  }

  @MessagePattern('transaction-validated')
  async handleTransactionUpdated(@Payload() message: any) {
    console.log('Transaction validated MESSAGE', message);
    await this.transactionsService.updateStatus(
      message.transactionId,
      message.status
    );
  }
}
