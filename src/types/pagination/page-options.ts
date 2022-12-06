import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PageOptions {
  readonly order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly offset?: number = 0;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  readonly limit?: number = 10;

 
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

// offset: number = 0,
// limit: number | null = null,
// idsToSkip = 0,