import { injectable, inject } from "tsyringe";
import { compareSync } from "bcrypt";

import { IUsersRepository } from "./users-repository";

export interface IUsersService {
  authenticateUser: (any) => any;
  getUser: (any) => any;
  createUser: (any) => any;
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

  async getUser(getUserDTO) {
    try {
      return this.usersRepository.getUser(getUserDTO);
    } catch (error) {
      throw new Error(error?.message + " db request problem");
    }
  }

  async createUser(createUserDTO) {
    return this.usersRepository.createUser(createUserDTO);
  }
}

export default UsersService;
