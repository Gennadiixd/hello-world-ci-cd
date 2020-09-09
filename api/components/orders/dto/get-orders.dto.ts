import { IsNotEmpty } from "class-validator";
import GetEntityDTO from "../../../lib/dto-proto/get-entity-dto";

export class GetOrdersDTO extends GetEntityDTO {
  @IsNotEmpty()
  where: any;

  constructor({ userId }) {
    super();
    this.where = userId ? { user_id: userId } : undefined;
  }
}
