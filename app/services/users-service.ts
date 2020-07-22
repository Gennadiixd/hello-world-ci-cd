import HttpService from "./core/http-service";

export default class UsersService extends HttpService {
  constructor(options) {
    super(options);
  }

  loginUser(user): Promise<{ data: any }> {
    return this.post("user/login", user);
  }
}
