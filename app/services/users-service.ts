import HttpService from "./core/http-service";

export default class UsersService extends HttpService {
  constructor(options) {
    super(options);
  }

  authorizeUser(): Promise<{ data: any }> {
    return this.get("users/authorize", {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  loginUser(): Promise<{ data: any }> {
    return this.get("users/login");
  }
}
