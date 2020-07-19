import { injectable, inject } from "tsyringe";

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

  loginUser(loginDTO) {
    return this.usersRepository.getUser(loginDTO);
  }
}

export default UsersService;
