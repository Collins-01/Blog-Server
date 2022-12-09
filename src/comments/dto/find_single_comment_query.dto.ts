import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export default class FindSingleCommentQuery {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  authorId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  postId: number;
}
