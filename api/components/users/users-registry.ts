import ConfigRegistry from "../config/config-registry";
import UsersService from "./users-service";
import UsersRepository from "./users-repository";
import DBConnection from "../../connection";
import AuthGuard from "../../lib/auth/auth-guard";

export default class UsersRegistry extends ConfigRegistry {
  constructor(container) {
    super(container);
  }

  registerDependencies() {
    this.register("IUsersService", UsersService);
    this.register("IUsersRepository", UsersRepository);
    this.register("IDBConnection", DBConnection);
    this.register("IAuthGuard", AuthGuard);
  }
}
