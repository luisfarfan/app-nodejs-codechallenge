import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { TransactionStatusEntity } from './transaction-status.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity({
  name: 'transactions',
})
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  accountExternalIdDebit: string;

  @Column({ type: 'uuid' })
  accountExternalIdCredit: string;

  @Column()
  transferTypeId: number;

  @Column('decimal')
  value: number;

  @OneToMany(() => TransactionStatusEntity, (status) => status.transaction)
  statuses: TransactionStatusEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  private _lastStatus?: TransactionStatusEntity;

  @Expose()
  get lastStatus(): TransactionStatusEntity {
    return this._lastStatus;
  }

  set lastStatus(status: TransactionStatusEntity) {
    this._lastStatus = status;
  }
}
