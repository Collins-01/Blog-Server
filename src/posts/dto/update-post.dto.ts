import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string | undefined;

  @IsOptional()
  @IsString()
  description?: string | undefined;

  @IsOptional()
  @IsString()
  backgroundImage?: string | undefined;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string | undefined;

  @IsOptional()
  @IsArray()
  hashTags: string[];
}
