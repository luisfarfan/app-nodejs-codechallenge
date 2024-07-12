import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class KafkaService {
  constructor(@Inject('ANTIFRAUD_SERVICE') private clientKafka: ClientKafka) {}

  sendMessage<T>(topic: string, message: T): Observable<void> {
    const serializedMessage = JSON.stringify(message);
    return this.clientKafka.emit(topic, serializedMessage);
  }

  async connect(): Promise<void> {
    await this.clientKafka.connect();
  }
}
