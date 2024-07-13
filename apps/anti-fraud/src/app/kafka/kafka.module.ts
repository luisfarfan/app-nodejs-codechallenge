import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import KafkaConfig from '../config/kafka.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KafkaConfig.ANTIFRAUD_SERVICE,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>('KAFKA_FRAUD_CLIENT_ID'),
              brokers: [configService.get<string>('KAFKA_BROKER')],
            },
            consumer: {
              groupId: configService.get<string>(
                'KAFKA_FRAUD_CONSUMER_GROUP_ID'
              ),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],

  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
