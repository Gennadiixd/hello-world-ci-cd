export class DBConnectionError extends Error {
  info: any;
  type: any;
  constructor(message) {
    super(message);
    this.name = "DBConnectionError";
    this.info = "db unreachable!";
    this.type = "DAL!";
  }
}
