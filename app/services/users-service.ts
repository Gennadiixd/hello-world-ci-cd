import HttpService from "./core/http-service";

export default class UsersService extends HttpService {
  constructor(options) {
    super(options);
  }

  authorizeUser(): Promise<{ data: any }> {
    return this.get("users/authorize");
  }

  loginUser(product): Promise<{ data: any }> {
    return this.post("users/login", product);
  }
}
