import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import KafkaConfig from '../config/kafka.config';

@Injectable()
export class KafkaService {
  constructor(
    @Inject(KafkaConfig.TRANSACTION_SERVICE) private clientKafka: ClientKafka
  ) {}

  sendMessage<T>(topic: string, message: T): Observable<void> {
    const serializedMessage = JSON.stringify(message);
    return this.clientKafka.emit(topic, serializedMessage);
  }

  async connect(): Promise<void> {
    await this.clientKafka.connect();
  }
}
