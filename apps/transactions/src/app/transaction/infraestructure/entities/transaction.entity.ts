import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { TransactionStatus } from './transaction-status.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  accountExternalIdDebit: string;

  @Column({ type: 'uuid' })
  accountExternalIdCredit: string;

  @Column()
  tranferTypeId: number;

  @Column('decimal')
  value: number;

  @OneToMany(() => TransactionStatus, (status) => status.transaction)
  statuses: TransactionStatus[];

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  private _lastStatus?: TransactionStatus;

  @Expose()
  get lastStatus(): TransactionStatus {
    return this._lastStatus;
  }

  set lastStatus(status: TransactionStatus) {
    this._lastStatus = status;
  }
}
