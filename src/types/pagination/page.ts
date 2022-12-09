import { IsArray } from 'class-validator';
import { Meta } from './meta';

export class Page<T> {
  @IsArray()
  readonly data: T[];

  meta: Meta;
  constructor(data: T[], meta: Meta) {
    this.data = data;
    this.meta = meta;
  }
}
