import ConfigRegistry from "../config/config-registry";
import UsersService from "../users/users-service";
import AuthGuard from "../../lib/auth/auth-guard";

export default class SessionRegistry extends ConfigRegistry {
  constructor(container) {
    super(container);
  }

  registerDependencies() {
    this.register("IUsersService", UsersService);
    this.register("IAuthGuard", AuthGuard);
  }
}
