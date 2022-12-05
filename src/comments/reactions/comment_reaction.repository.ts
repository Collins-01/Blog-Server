import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import CommentsReactionDto from './comment_reaction.dto';

@Injectable()
export default class CommentsReactionRepository {
  constructor(private databaseService: DatabaseService) {}
  table = 'comments-reactions';
  async likeComment(dto: CommentsReactionDto) {
    const response = await this.databaseService.runQuery(
      `
            INSERT INTO ${this.table} ( 
                comment_id,
                liker_id
            )
           
            VALUES ( 
                $1,
                $2
            )

            RETURNING *

        `,
      [dto.commentId, dto.likerId],
    );
    console.log(`Response from Liking Comment: ${response}`);
  }

  async unlikeComment(dto: CommentsReactionDto) {
    const response = await this.databaseService.runQuery(
      `
        DELETE FROM ${this.table}
        WHERE comment_id = $1 AND liker_id = $2
    `,
      [dto.commentId, dto.likerId],
    );
    console.log(`Response from UnLiking Comment: ${response}`);
  }
}
