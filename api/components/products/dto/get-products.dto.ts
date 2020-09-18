import { Like } from "typeorm";
import GetEntityDTO from "../../../lib/dto-proto/get-entity-dto";

export class GetProductsDTO extends GetEntityDTO {
  skip: number;

  take: number;

  title: any;

  order: object;

  constructor({ skip, take, title, order, orderBy }) {
    super();
    this.skip = skip;
    this.take = take;
    this.title = title ? Like(`%${title}%`) : undefined;
    this.order = orderBy ? { [orderBy]: order } : undefined;
  }
}
