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

  get params() {
    return Object.keys(this).reduce((accum, param) => {
      const currentParam = this[param];
      if (currentParam) accum[param] = currentParam;
      return accum;
    }, {});
  }
}
