import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { TransactionStatusEnum } from '../../enums/transaction-status.enum';

@Entity({
  name: 'transaction_statuses',
})
export class TransactionStatusEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.statuses)
  transaction: TransactionEntity;

  @Column({ type: 'uuid' })
  transactionId: string;

  @Column({ type: 'enum', enum: TransactionStatusEnum })
  status: TransactionStatusEnum;

  @CreateDateColumn()
  createdAt: Date;
}
