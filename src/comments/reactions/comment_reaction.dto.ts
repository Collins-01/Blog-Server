import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export default class CommentsReactionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  commentId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  likerId: number;
}
