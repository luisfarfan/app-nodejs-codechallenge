import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const kafkaClientId = configService.get<string>(
    'KAFKA_TRANSACTION_CLIENT_ID'
  );
  const kafkaConsumer = configService.get<string>(
    'KAFKA_TRANSACTION_CONSUMER_GROUP_ID'
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

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  await app.startAllMicroservices();
  await app.listen(3000);
  Logger.log(`Microservice Transaction is running on port ${process.env.PORT}`);
}
bootstrap();
