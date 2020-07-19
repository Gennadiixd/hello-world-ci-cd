import { IsNotEmpty } from "class-validator";

export class LoginUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  constructor({ name, password }) {
    this.name = name;
    this.password = password;
  }
}
