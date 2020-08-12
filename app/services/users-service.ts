import HttpService from "./core/http-service";
import { isServer } from "../utils";

export default class UsersService extends HttpService {
  constructor(options) {
    super(options);
  }

  async logoutUser() {
    return this.post("user/logout");
  }

  async loginUser(userData): Promise<{ data: any }> {
    const { data } = await this.post("user/login", userData);

    return data;
  }

  async loginUserByCookie(token?: string): Promise<{ data: any }> {
    const options =
      token && isServer()
        ? {
            headers: {
              Cookie: token,
            },
          }
        : {};

    const { data } = await this.post("user/login", {}, options);

    return data;
  }
}
