import { IsNotEmpty } from "class-validator";

export class AuthenticateUserDTO {
  @IsNotEmpty()
  id: string;

  constructor({ id }) {
    this.id = id;
  }
}
