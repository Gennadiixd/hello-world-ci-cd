import { IsNotEmpty } from "class-validator";

export class AuthenticateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  id: string;

  constructor({ name, id }) {
    this.name = name;
    this.id = id;
  }
}
