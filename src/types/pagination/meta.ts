import { PageMetaParameters } from './page-meta-parameters';

export class Meta {
  readonly page: number; //* The Page you want to request for from the database.

  readonly take: number;  //* How many times to take per page.

  readonly itemCount: number; //* Total number of items in the Table your Database.

  readonly pageCount: number;   //* Total number of Pages we have in the database. i.2 (Total Items in DB/take)

  readonly hasPreviousPage: boolean; //* Checks if a previous page existed.

  readonly hasNextPage: boolean;

  constructor({ pageOptions, itemCount }: PageMetaParameters) {
    this.page = pageOptions.page ?? this.page;
    this.take = pageOptions.take ?? this.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
