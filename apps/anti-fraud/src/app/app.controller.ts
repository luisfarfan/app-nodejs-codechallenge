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
    console.log('New transaction created', message);
    const parsedMessage = JSON.parse(message.value);
    console.log('Parsed message', parsedMessage);
    const { value, transactionId } = parsedMessage;
    const isFraud = await firstValueFrom(
      this.antiFraudService.validateTransaction(value)
    );

    const response = {
      transactionId,
      status: isFraud ? 'rejected' : 'validated',
    };

    this.kafkaService
      .sendMessage('transaction-validated', response)
      .subscribe();
  }
}
