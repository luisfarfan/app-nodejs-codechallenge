import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AntiFraudService } from './application/anti-fraud.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [AntiFraudService],
})
export class AppModule {}
