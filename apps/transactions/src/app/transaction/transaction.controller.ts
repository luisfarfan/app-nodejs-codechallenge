import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TransactionsService } from '../transaction.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionResponseDto } from '../dto/transaction-response.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionsService) {}

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

  // @Put(':id')
  // async updateStatus(
  //   @Param('id') id: string,
  //   @Body() updateStatusDto: TransactionStatusDto
  // ): Promise<TransactionResponseDto> {
  //   const { status } = updateStatusDto;
  //   return this.transactionsService.updateStatus(id, status as TransactionStatus);
  // }
}
