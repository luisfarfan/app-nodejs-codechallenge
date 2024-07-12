import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaModule } from './infraestructure/kafka/kafka.module';
import { AntiFraudService } from './application/anti-fraud.service';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [AntiFraudService],
})
export class AppModule {}
