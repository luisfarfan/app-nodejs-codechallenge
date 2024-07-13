import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const kafkaClientId = configService.get<string>('KAFKA_FRAUD_CLIENT_ID');
  const kafkaConsumer = configService.get<string>(
    'KAFKA_FRAUD_CONSUMER_GROUP_ID'
  );
  const kafkaBroker = configService.get<string>('KAFKA_BROKER');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: kafkaClientId,
        brokers: [kafkaBroker],
      },
      consumer: {
        groupId: kafkaConsumer,
      },
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
