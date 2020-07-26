import HttpService from "./core/http-service";

export default class UsersService extends HttpService {
  constructor(options) {
    super(options);
  }

  loginUser(userData): Promise<{ data: any }> {
    return this.post("user/login", userData);
  }
}
