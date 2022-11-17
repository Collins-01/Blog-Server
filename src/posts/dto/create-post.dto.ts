import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  desciption: string;

  @IsNotEmpty()
  @IsString()
  backgroundImage: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsArray()
  @ArrayNotEmpty()
  hashTags: string[];
}
