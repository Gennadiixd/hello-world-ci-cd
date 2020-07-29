import { injectable, inject } from "tsyringe";
import { compareSync } from "bcrypt";

import { IUsersRepository } from "./users-repository";
import { DBConnectionError } from "../errors/db-connection-error";

export interface IUsersService {
  loginUser: (any) => any;
}

@injectable()
class UsersService implements IUsersService {
  constructor(
    @inject("IUsersRepository")
    public usersRepository: IUsersRepository
  ) {}

  async loginUser(loginUserDTO) {
    const { name, password } = loginUserDTO;

    try {
      const user = await this.usersRepository.getUser({ name });

      if (compareSync(password, user.password)) {
        return user;
      } else {
        throw new Error("passwords does not much");
      }
    } catch (error) {
      console.log(error);
      throw new DBConnectionError(error?.message + " db request problem");
    }
  }
}

export default UsersService;
