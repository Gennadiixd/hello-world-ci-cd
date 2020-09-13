import GetEntityDTO from "../../../lib/dto-proto/get-entity-dto";

export class GetUserDTO extends GetEntityDTO {
  name: string;

  id: number;

  constructor({ name, id }) {
    super();
    this.name = name;
    this.id = id;
  }
}
