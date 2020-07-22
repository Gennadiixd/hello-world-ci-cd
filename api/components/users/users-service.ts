import { injectable, inject } from "tsyringe";
import { compareSync } from "bcrypt";

import { IUsersRepository } from "./users-repository";

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
    const user = await this.usersRepository.getUser({ name });

    if (compareSync(password, user.password)) {
      return user;
    } else {
      throw new Error("unauthorized");
    }
  }
}

export default UsersService;
