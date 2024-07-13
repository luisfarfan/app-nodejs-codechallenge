import { Controller } from '@nestjs/common';
import { AntiFraudService } from './application/anti-fraud.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { KafkaService } from './kafka/kafka.service';
import KafkaConfig from './config/kafka.config';

@Controller()
export class AppController {
  constructor(
    private readonly kafkaService: KafkaService,
    private antiFraudService: AntiFraudService
  ) {}

  @MessagePattern(KafkaConfig.TRANSACTION_CREATED)
  async handleTransactionCreated(@Payload() message: any) {
    const { value, transactionExternalId } = message;
    const isFraud = await firstValueFrom(
      this.antiFraudService.validateTransaction(value)
    );

    const response = {
      transactionId: transactionExternalId,
      status: isFraud ? 'rejected' : 'approved',
    };

    this.kafkaService
      .sendMessage(KafkaConfig.TRANSACTION_VALIDATED, response)
      .subscribe();
  }
}
