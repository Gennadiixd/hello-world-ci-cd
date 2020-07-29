export class AuthenticationError extends Error {
  info: any;
  type: any;
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.info = "Authentication failed, wrong credentials!";
    this.type = "BLL";
  }
}
