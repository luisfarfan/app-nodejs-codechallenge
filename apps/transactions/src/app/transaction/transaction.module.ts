import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionsService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './infraestructure/entities/transaction.entity';
import { TransactionStatus } from './infraestructure/entities/transaction-status.entity';
import { KafkaModule } from '../infraestructure/kafka/kafka.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SqlRepository } from './infraestructure/database/sql.repository';

@Module({
  imports: [
    KafkaModule,
    CqrsModule,
    TypeOrmModule.forFeature([Transaction, TransactionStatus]),
  ],
  controllers: [TransactionController],
  providers: [
    TransactionsService,
    {
      provide: 'TransactionRepository',
      useClass: SqlRepository,
    },
  ],
})
export class TransactionModule {}
