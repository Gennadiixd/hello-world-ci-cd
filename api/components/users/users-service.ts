import { injectable, inject } from "tsyringe";
import { compareSync } from "bcrypt";

import { IUsersRepository } from "./users-repository";

export interface IUsersService {
  loginUser: (any) => any;
  findUserByName: (any) => any;
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
        delete user.password;

        return user;
      }
      
      throw new Error("passwords does not much");
    } catch (error) {
      throw new Error(error?.message + " db request problem");
    }
  }

  async findUserByName(getUserDTO) {
    try {
      return this.usersRepository.getUser(getUserDTO);
    } catch (error) {
      throw new Error(error?.message + " db request problem");
    }
  }
}

export default UsersService;
