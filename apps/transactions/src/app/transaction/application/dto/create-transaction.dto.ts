import { IsUUID, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  @IsNotEmpty()
  accountExternalIdDebit: string;

  @IsUUID()
  @IsNotEmpty()
  accountExternalIdCredit: string;

  @IsNumber()
  @IsNotEmpty()
  transferTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
