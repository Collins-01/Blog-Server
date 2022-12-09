import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import PostgresErrorCode from 'src/database/postgres_error_code.enum';
import PostReactionModel, {
  PostReactionType,
} from './models/post_reaction.model';

@Injectable()
export default class PostsReactionsRepository {
  constructor(private databaseService: DatabaseService) {}
  table = 'posts_reactions';

  async createReaction(
    postId: number,
    userId: number,
    reaction: PostReactionType,
  ) {
    try {
      const response = await this.databaseService.runQuery(
        `
      INSERT INTO ${this.table} 
      ( 
        post_id,
        user_id,
        reaction
      )
      VALUES ( 
        $1,
        $2,
        $3
      )


      `,
        [postId, userId, reaction],
      );
      console.log(`Result from creating a new reaction: ${response.rowCount}`);
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User has already added a reaction.');
      }
      throw new Error(error.code);
    }
  }

  async removeReaction(postId: number, userId: number) {
    const response = await this.databaseService.runQuery(
      `
    DELETE FROM ${this.table}
    WHERE post_id = $1 AND  user_id = $2
    RETURNING * 
  `,
      [postId, userId],
    );
    console.log(`Response from removing reaction: ${response.rowCount}`);
    if (response.rowCount >= 1) {
      return 'Successfully removed reaction.';
    }

    throw new NotFoundException('Post does not exist.');
  }

  async updateReaction(
    postId: number,
    userId: number,
    reaction: PostReactionType,
  ) {
    const response = await this.databaseService.runQuery(
      `
     UPDATE ${this.table}
     SET reaction = $3
     WHERE post_id = $1 AND user_id = $2
     RETURNING * 
    `,
      [postId, userId, reaction],
    );
    console.log(`RESULT: FROM UPDATING POST REACTION : ${response.rowCount}`);

    if (!response.rows[0]) {
      throw new NotFoundException('Post does not exist.');
    }
  }
  async getAllReactionsForPost(postId: number) {
    try {
      const response = await this.databaseService.runQuery(
        `
     SELECT * FROM ${this.table} 
     WHERE post_id = $1

    `,
        [postId],
      );
      const list = response.rows.map((e) => {
        return new PostReactionModel(e);
      });
      return list;
    } catch (error) {
      console.warn(`Error Code ==== ${error.code}`);
      throw new Error(error);
    }
  }
}
