import HttpService from "./core/http-service";

export default class UsersService extends HttpService {
  constructor(options) {
    super(options);
  }

  authorizeUser(): Promise<{ data: any }> {
    return this.get("user/authorize");
  }

  loginUser(user): Promise<{ data: any }> {
    return this.post("user/login", user);
  }
}
