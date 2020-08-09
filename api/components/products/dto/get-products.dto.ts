export class GetProductsDTO {
  skip: number;

  take: number;

  title: string;

  constructor({ skip, take, title }) {
    this.skip = skip;
    this.take = take;
    this.title = title;
  }
}
