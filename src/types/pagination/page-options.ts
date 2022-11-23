import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PageOptions {
  readonly order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page ?? 1 - 1) * (this.take ?? 10);
    /*
    Consider 1,000 elements in your Database.
    you want to query 10 items per page, starting with page 1.
    To know where to start counting from, i.e how many items to skip behind.
    (page-1) * (limit per page), if page=1 ===> (1-1) * 10= 0, so we start counting from index 0 on the table.
    if page = 2.
    (2-1) * (limit per page) = 10, start counting from index 10, you have skipped the last 10 items
    */
  }
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
