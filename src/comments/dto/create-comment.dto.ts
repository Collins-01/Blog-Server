import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  authorID: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  postID: string;
}
