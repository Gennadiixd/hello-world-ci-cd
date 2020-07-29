class AuthorizationError extends Error {
  info: any;
  type: any;
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
    this.info = "User not authorized to do this!";
    this.type = "BLL";
  }
}
