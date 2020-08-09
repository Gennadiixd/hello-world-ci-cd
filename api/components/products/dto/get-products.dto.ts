export class GetProductsDTO {
  skip: number;

  take: number;

  title: string;

  order: object;

  constructor({ skip, take, title, filterBy, orderBy }) {
    this.skip = skip;
    this.take = take;
    this.title = title;
    this.order = filterBy ? { [filterBy]: orderBy } : undefined;
  }
}
