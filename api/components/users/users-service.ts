import { injectable, inject } from "tsyringe";
import { compareSync } from "bcrypt";

import { IUsersRepository } from "./users-repository";

export interface IUsersService {
  authenticateUser: (any) => any;
  findUserByName: (any) => any;
}

@injectable()
class UsersService implements IUsersService {
  constructor(
    @inject("IUsersRepository")
    public usersRepository: IUsersRepository
  ) {}

  async authenticateUser(authUserDTO) {
    const { name, password } = authUserDTO;

    try {
      const user = await this.usersRepository.getUser(name);

      if (compareSync(password, user.password)) {
        delete user.password;

        return user;
      }

      throw new Error("passwords does not much");
    } catch (error) {
      throw new Error(error?.message + " db request problem");
    }
  }

  async findUserByName(name) {
    try {
      return this.usersRepository.getUser(name);
    } catch (error) {
      throw new Error(error?.message + " db request problem");
    }
  }
}

export default UsersService;
