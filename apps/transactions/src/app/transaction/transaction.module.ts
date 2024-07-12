import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './infraestructure/entities/transaction.entity';
import { TransactionStatus } from './infraestructure/entities/transaction-status.entity';
import { KafkaModule } from '../infraestructure/kafka/kafka.module';
import { CqrsModule } from '@nestjs/cqrs';
import { OrmTransactionSqlRepository } from './infraestructure/database/orm-transaction-sql.repository';
import { CreateTransactionHandler } from './application/handlers/create-transaction.handler';
import { UpdateTransactionStatusHandler } from './application/handlers/update-transaction-status.handler';
import { GetTransactionHandler } from './application/handlers/get-transaction.handler';

@Module({
  imports: [
    KafkaModule,
    CqrsModule,
    TypeOrmModule.forFeature([Transaction, TransactionStatus]),
  ],
  controllers: [TransactionController],
  providers: [
    CreateTransactionHandler,
    UpdateTransactionStatusHandler,
    GetTransactionHandler,
    {
      provide: 'ITransactionRepository',
      useClass: OrmTransactionSqlRepository,
    },
  ],
})
export class TransactionModule {}
