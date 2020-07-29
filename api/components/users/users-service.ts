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
    
    console.log('FOUND IN DB');
    console.log(user);

    if (compareSync(password, user.password)) {
      console.log('COMPARED -> OK');

      return user;
    } else {
      throw new Error("unauthorized");
    }
  }
}

export default UsersService;
