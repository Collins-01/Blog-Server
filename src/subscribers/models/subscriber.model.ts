export interface SubscriberModelData {
  subscriber_id: number;
  user_id: number;
}

export default class SubscriberModel {
  subscriberId: number;
  userId: number;

  constructor(data: SubscriberModelData) {
    this.subscriberId = data.subscriber_id;
    this.userId = data.user_id;
  }
}
