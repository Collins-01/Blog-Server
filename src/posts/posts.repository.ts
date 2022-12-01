import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { CreatePostDto } from './dto/create-post.dto';
import PostModel from './models/post.model';

@Injectable()
export default class PostsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllPosts(
    offset: number = 0,
    limit: number | null = null,
    idsToSkip = 0,
  ) {
    const response = await this.databaseService.runQuery(
      `
    WITH selected_posts AS
    (SELECT * FROM posts
    WHERE id > $3
    ORDER BY id ASC
    OFFSET $1
    LIMIT $2
    ),
    total_posts_count_response AS  (
        SELECT COUNT (*)::int  AS total_posts_counts FROM posts
    )

    SELECT * FROM selected_posts, total_posts_count_response
    `,
      [offset, limit, idsToSkip],
    );
    const items = response.rows.map(
      (databaseRow) => new PostModel(databaseRow),
    );
    const count = response.rows[0]?.total_posts_count || 0;
    return {
      items,
      count,
    };
  }

  async createPost(dto: CreatePostDto, authorId: number) {
    const response = await this.databaseService.runQuery(
      ` 
      INSERT INTO  posts  
      (
        title,
        post_content,
        author_id,
        description,
        background_image

      )

      VALUES ($1, $2, $3, $4, $5)

      RETURNING * 
      `,
      [dto.title, dto.content, authorId, dto.description, dto.backgroundImage],
    );
    console.log(response.rows[0]);
    return new PostModel(response.rows[0]);
  }
}
