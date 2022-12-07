import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import DatabaseService from 'src/database/database.service';
import { PageOptions } from 'src/types/pagination';
import { CreateCommentDto } from './dto/create-comment.dto';
import CommentModel from './models/comment.model';

@Injectable()
export class CommentsRepository {
  table = 'comments';
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM comments
    `);
    return plainToInstance(CommentModel, databaseResponse.rows);
  }

  // * Create Comment
  async createComment(dto: CreateCommentDto,userId:number) {
    try {
      const response = await this.databaseService.runQuery(
        `
       INSERT INTO ${this.table} ( 
        post_id,
        comment_content,
        author_id,
        comment_likes,
        deletion_date

       )
       VALUES ( 
        $1,
        $2,
        $3,
        $4,
        $5
        
       )

       RETURNING *

      `,
        [dto.postId, dto.content, userId, 0, null],
      );

      return new CommentModel(response.rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }

  // * Get Comments for Posts
  // TODO: Add Pagination
  async getCommentsForPost(
    postId: number,
    pageOptions: PageOptions,
    idsToSkip: number,
  ) {
    try {
      const response = await this.databaseService.runQuery(
        `
        SELECT * FROM ${this.table}
        WHERE post_id = $1 AND id > $4
        ORDER BY id
        OFFSET $2
        LIMIT $3
        
      `,
        [postId, pageOptions.offset, pageOptions.limit, idsToSkip],
      );
      return response.rows.map((e) => new CommentModel(e));
    } catch (error) {
      throw new Error(error);
    }
  }
  // * Delete Comment
  async deleteComment(comment_id: number) {
    try {
      const response = await this.databaseService.runQuery(
        `
        UPDATE ${this.table} 
        SET deletion_date = now()
        WHERE id = $1 AND deletion_date = NULL
        RETURNING *
      `,
        [comment_id],
      );

      if (response.rowCount === 0) {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // * Get Single Comment for post
  async getSingleCommentForPost(postId: number, commentId: number) {
    try {
      const response = await this.databaseService.runQuery(
        `
        SELECT * FROM ${this.table}
        WHERE post_id = $1 AND id = $2 AND deletion_date = NULL
      `,
        [postId, commentId],
      );
      if (!response.rows[0]) {
        throw new NotFoundException();
      }
      return new CommentModel(response.rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }
  // * Get All Comments from a Post.
  async getComments(postId: number) {
    const response = await this.databaseService.runQuery(
      `
      SELECT *  FROM ${this.table}
      WHERE post_id = $1 AND deletion_date = NULL
    `,
      [postId],
    );

    if (response.rowCount === 0) {
      throw new NotFoundException();
    }
    const comments = response.rows.map((e) => new CommentModel(e));

    return comments;
  }
}

/*
SELECT p.*, MAX(r.reaction) AS reaction
FROM posts p
JOIN reactions r ON p.post_id = r.post_id
GROUP BY p.post_id;
*/





/*
SELECT p.*, r.reaction
FROM posts p
JOIN reactions r ON p.post_id = r.post_id;
*/