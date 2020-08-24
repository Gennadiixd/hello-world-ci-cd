import { IsNotEmpty } from "class-validator";

export class AuthUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  constructor({ name, password }) {
    this.name = name;
    this.password = password;
  }
}
