import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

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
  @IsOptional()
  hashTags: string[];
}
