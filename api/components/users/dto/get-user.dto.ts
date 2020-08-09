import { IsNotEmpty } from "class-validator";

export class GetUserDTO {
  @IsNotEmpty()
  name: string;

  constructor({ name }) {
    this.name = name;
  }
}
