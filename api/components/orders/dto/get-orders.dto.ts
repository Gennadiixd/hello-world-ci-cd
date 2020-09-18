import GetEntityDTO from "../../../lib/dto-proto/get-entity-dto";

export interface IGetOrdersDTO extends GetEntityDTO {
  where?: number;
}

export class GetOrdersDTO extends GetEntityDTO implements IGetOrdersDTO {
  where: any;

  constructor({ userId }) {
    super();
    this.where = userId ? { user_id: userId } : undefined;
  }
}
