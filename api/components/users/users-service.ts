import { injectable, inject } from "tsyringe";

import { IUsersRepository } from "./users-repository";

export interface IUsersService {
  authorizeSID: (sid: string) => any;
  loginUser: ({ id, name, password }) => any;
}

export interface SearchCriteria {
  id?: number;
  password?: string;
  name?: string;
}

@injectable()
class UsersService implements IUsersService {
  constructor(
    @inject("IUsersRepository")
    public usersRepository: IUsersRepository
  ) {}

  authorizeSID(sid: string) {
    console.log(sid);
  }

  loginUser({ id, password = "1234", name = "admin" }) {
    const searchCriteria: SearchCriteria = id
      ? { id, name }
      : { password, name };

    return this.usersRepository.getUser(searchCriteria);
  }
}

export default UsersService;
