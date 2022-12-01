import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import DatabaseService from 'src/database/database.service';
import CommentModel from './comment.model';

@Injectable()
export class CommentsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM comments
    `);
    return plainToInstance(CommentModel, databaseResponse.rows);
  }
}
