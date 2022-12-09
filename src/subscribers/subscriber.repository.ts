import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';

@Injectable()
export default class SubscribersRepository {
  constructor(private databaseService: DatabaseService) {}
  table = 'subscribers';

  async subscribe(subscriberId: number, userId: number) {
    try {
      const response = await this.databaseService.runQuery(
        `
    INSERT INTO ${this.table} 
    (subscriber_id, user_id)
    VALUES (
        $1,
        $2
    )
    RETURNING *
    `,
        [subscriberId, userId],
      );
      console.log(`Response from Subscribing: ${response.rowCount}`);
    } catch (error) {
      throw new Error(error);
    }
  }

  async unsubscribe(subscriberId: number, userId: number) {
    const response = await this.databaseService.runQuery(
      `
    DELETE FROM ${this.table} 
    WHERE subscriber_id = $1 AND user_id = $2
    RETURNING *
    `,
      [subscriberId, userId],
    );

    if (!response.rows[0]) {
      throw new NotFoundException(`Failed to unsubscribe, user not found.`);
    }
    console.log(`Response from UnSubscribing: ${response}`);
  }

  async getSubscribersForUser(userId: number) {
    const response = await this.databaseService.runQuery(
      `
        SELECT  COUNT(*)::int FROM ${this.table}
        WHERE user_id = $1 
    `,
      [userId],
    );
    console.log(`Response from Subscribers Count: ${response.rows[0].count}`);
    const count = response.rows[0].count as number;
    return count;
  }
}
