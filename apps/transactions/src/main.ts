import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'transaction',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'transaction-consumer',
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
