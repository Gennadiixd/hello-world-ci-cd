import HttpService from "./core/http-service";
import { isServer } from "../utils";

export default class UsersService extends HttpService {
  constructor(options) {
    super(options);
  }

  async logoutUser() {
    return this.delete("session");
  }

  async loginUser(userData): Promise<{ data: any }> {
    const { data } = await this.post("session", userData);

    return data;
  }

  async restoreSession(token?: string): Promise<{ data: any }> {
    const options =
      token && isServer()
        ? {
            headers: {
              Cookie: token,
            },
          }
        : {};

    const { data } = await this.get("session", options);

    return data;
  }
}
