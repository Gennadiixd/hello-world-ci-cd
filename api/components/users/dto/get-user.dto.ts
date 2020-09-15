import GetEntityDTO, {
  IGetEntityDTO,
} from "../../../lib/dto-proto/get-entity-dto";

export interface IGetUserDTO extends IGetEntityDTO {
  name?: string;
  id?: number;
}

export class GetUserDTO extends GetEntityDTO implements IGetUserDTO {
  name: string;
  id: number;

  constructor({ name, id }) {
    super();
    this.name = name;
    this.id = id;
  }
}
