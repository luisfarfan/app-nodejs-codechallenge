import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionsService } from '../transaction.service';
import { TransactionRepository } from '../infraestructure/repository/transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { TransactionStatus } from '../entities/transaction-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionStatus])],
  controllers: [TransactionController],
  providers: [TransactionRepository, TransactionsService],
})
export class TransactionModule {}
