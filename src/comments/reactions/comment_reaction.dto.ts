import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export default class CommentsReactionDto {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  commentId: number;

}
