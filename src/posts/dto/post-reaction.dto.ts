import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { PostReactionType } from '../models/post_reaction.model';

export default class PostsReactionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  postId: number;

  @IsNotEmpty()
  @IsEnum(PostReactionType)
  reaction: PostReactionType;
}
