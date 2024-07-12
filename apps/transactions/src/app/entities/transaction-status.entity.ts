import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { TransactionStatusEnum } from '../enums/transaction-status.enum';

@Entity()
export class TransactionStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Transaction, (transaction) => transaction.statuses)
  transaction: Transaction;

  @Column({ type: 'enum', enum: TransactionStatusEnum })
  status: TransactionStatusEnum;

  @CreateDateColumn()
  createdAt: Date;
}
