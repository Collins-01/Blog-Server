import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, MIN, Min } from 'class-validator';
import { PostReactionType } from '../models/post_reaction.model';

export default class PostsReactionDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  postId: number;

  @IsNotEmpty()
  @IsEnum(PostReactionType)
  reaction: PostReactionType;
}
