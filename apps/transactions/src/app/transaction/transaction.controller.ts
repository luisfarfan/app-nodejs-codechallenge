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
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { KafkaService } from '../infraestructure/kafka/kafka.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

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
  handleTransactionUpdated(@Payload() message: any) {
    console.log('Transaction updated from TRANSACTION', message);
  }

  // @Put(':id')
  // async updateStatus(
  //   @Param('id') id: string,
  //   @Body() updateStatusDto: TransactionStatusDto
  // ): Promise<TransactionResponseDto> {
  //   const { status } = updateStatusDto;
  //   return this.transactionsService.updateStatus(id, status as TransactionStatus);
  // }
}
