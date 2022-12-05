import { BadRequestException, Injectable } from '@nestjs/common';
import SubscribersRepository from './subscriber.repository';

@Injectable()
export class SubscribersService {
  constructor(private subscribersRepository: SubscribersRepository) {}
  async subscribe(subId: number, userId: number) {
    if(subId===userId){
      throw new BadRequestException('You can not subscribe to your own Blog.')
    }
    return await this.subscribersRepository.subscribe(subId, userId);
  }

  async unsubscribe(subId: number,userId:number) {
    return await this.subscribersRepository.unsubscribe(subId, userId);
  }

  async getAllSubscribersForUser(userId:number){
    return await this.subscribersRepository.getSubscribersForUser(userId);
  }

}
