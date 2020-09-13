export class AuthUserDTO {
  name: string;

  password: string;

  constructor({ name, password }) {
    this.name = name;
    this.password = password;
  }
}
