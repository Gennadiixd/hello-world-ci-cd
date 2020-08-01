import HttpService from "./core/http-service";

export default class UsersService extends HttpService {
  constructor(options) {
    super(options);
  }

  async loginUser(userData): Promise<{ data: any }> {
    const { data } = await this.post("user/login", userData);

    return data;
  }

  async loginUserByCookie(): Promise<{ data: any }> {
    const { data } = await this.post("user/login");

    return data;
  }
}
