export class GetProductsDTO {
  skip: number;

  take: number;

  constructor({ skip, take }) {
    this.skip = skip;
    this.take = take;
  }
}
