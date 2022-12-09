import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { PageOptions } from 'src/types/pagination';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import PostModel from './models/post.model';

@Injectable()
export default class PostsRepository {
  constructor(private readonly databaseService: DatabaseService) {}
  table = 'posts';
  async getAllPosts(pageOptions: PageOptions, idsToSkip = 0) {
    const response = await this.databaseService.runQuery(
      `
    WITH selected_posts AS
    (
        SELECT * FROM posts
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
      [pageOptions.offset, pageOptions.limit, idsToSkip],
    );
    const items = response.rows.map(
      (databaseRow) => new PostModel(databaseRow),
    );
    const count = response.rows[0]?.total_posts_counts || 0;
    console.log(`Counts from Get all posts: ${count}`);
    return {
      items,
      count,
    };
  }

  async createPost(dto: CreatePostDto, authorId: number) {
    try {
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
        [
          dto.title,
          dto.content,
          authorId,
          dto.description,
          dto.backgroundImage,
        ],
      );
      console.log(response.rows[0]);
      return new PostModel(response.rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePost(id: number, userId: number) {
    const response = await this.databaseService.runQuery(
      `
      DELETE FROM posts
      WHERE id = $1 AND author_id = $2
      
    `,
      [id, userId],
    );

    if (response.rowCount === 0) {
      throw new NotFoundException();
    }
  }

  async findPostById(id: number) {
    const response = await this.databaseService.runQuery(
      `
    SELECT * FROM posts
    WHERE id = $1
    `,
      [id],
    );
    console.log(`Response from getting single post: ${response.rows}`);
    if (!response.rows[0]) {
      throw new NotFoundException('Post does not exist.');
    }
    return new PostModel(response.rows[0]);
  }

  async getAllPostsForUser(
    pageOptions: PageOptions,
    idsToSkip = 0,
    userId: number,
  ) {
    const response = await this.databaseService.runQuery(
      `
    WITH selected_posts AS
    (
      SELECT * FROM posts
      WHERE id > $3 AND author_id = $4
      ORDER BY id ASC
      OFFSET $1
      LIMIT $2
    ),
    total_posts_count_response AS  (
        SELECT COUNT (*)::int  AS total_posts_counts FROM posts
    )

    SELECT * FROM selected_posts, total_posts_count_response
    `,
      [pageOptions.offset, pageOptions.limit, idsToSkip, userId],
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

  async updatePost(dto: UpdatePostDto, userId: number, postId: number) {
    const { title, description, backgroundImage, content } = dto;

    if (
      ![title, description, backgroundImage, content].some(
        (value) => value !== undefined,
      )
    ) {
      return this.findPostById(postId);
    }
    const params: unknown[] = [postId, userId];
    const setQueryParts: string[] = [];
    if (title !== undefined) {
      params.push(title);
      setQueryParts.push(`title = $${params.length}`);
    }
    if (description !== undefined) {
      params.push(description);
      setQueryParts.push(`description = $${params.length}`);
    }
    if (content !== undefined) {
      params.push(content);
      setQueryParts.push(`content = $${params}`);
    }
    if (backgroundImage !== undefined) {
      params.push(backgroundImage);
      setQueryParts.push(`background_image = $${params}`);
    }
    const response = await this.databaseService.runQuery(
      `
      UPDATE ${this.table} 
      SET ${setQueryParts.join(', ')}
       WHERE  id = $1 AND author_id = $2
       RETURNING *

    `,
      params,
    );

    if (!response.rows[0]) {
      throw new NotFoundException('Post does not exist.');
    }

    return new PostModel(response.rows[0]);
  }

  async fetchPostsWithReactions() {
    const result = await this.databaseService.runQuery(`
      SELECT p.*, COUNT(r.post_id) AS like_count
      FROM posts p
      JOIN posts_reactions r ON p.id = r.post_id
      GROUP BY p.id
  `);
    // const data = result.rows[0];
    // console.log(
    //   `Response from Fetching Posts With Reactions: ${result.fields}`,
    // );

    return result.rows;
  }
}

/*
  SELECT p.*, COUNT(r.post_id) AS reaction_count
      FROM posts p
      JOIN posts_reactions r ON p.id = r.post_id
      GROUP BY p.id
*/