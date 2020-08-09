import { Like } from "typeorm";

export class GetProductsDTO {
  skip: number;

  take: number;

  title: any;

  order: object;

  constructor({ skip, take, title, filterBy, orderBy }) {
    this.skip = skip;
    this.take = take;
    this.title = title ? Like(`%${title}%`) : undefined;
    this.order = filterBy ? { [filterBy]: orderBy } : undefined;
  }
}
