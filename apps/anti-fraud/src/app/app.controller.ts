import { Controller, OnModuleInit } from '@nestjs/common';
import { KafkaService } from './infraestructure/kafka/kafka.service';
import { AntiFraudService } from './application/anti-fraud.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private antiFraudService: AntiFraudService
  ) {}

  async onModuleInit() {
    // await this.kafkaService.connect();
  }

  @MessagePattern('transaction-created')
  async handleTransactionCreated(@Payload() message: any) {
    console.log('Transaction created MESSAGE', message, typeof message);
    const { value, id } = message;
    const isFraud = await firstValueFrom(
      this.antiFraudService.validateTransaction(value)
    );

    console.log('VALUE AND ID', value, id);

    const response = {
      transactionId: id,
      status: isFraud ? 'rejected' : 'approved',
    };

    this.kafkaService
      .sendMessage('transaction-validated', response)
      .subscribe();
  }
}
