export interface IAuthUserDTO {
  name: string;
  password: string;
}

export class AuthUserDTO implements IAuthUserDTO {
  name: string;
  password: string;

  constructor({ name, password }) {
    this.name = name;
    this.password = password;
  }
}
