import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import SubscribersRepository from './subscriber.repository';

@Module({
  controllers: [SubscribersController],
  providers: [SubscribersService,SubscribersRepository]
})
export class SubscribersModule {}
