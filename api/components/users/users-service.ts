import { injectable, inject } from "tsyringe";
import { compareSync } from "bcrypt";

import { IUsersRepository } from "./users-repository";
import { IAuthUserDTO } from "./dto/auth-user-dto";
import { UserEntity } from "./user.entity";
import { GetUserDTO, IGetUserDTO } from "./dto/get-user.dto";
import { ICreateUserDTO } from "./dto/create-user.dto";

export interface IUsersService {
  authenticateUser: (authUserDTO: IAuthUserDTO) => Promise<UserEntity>;
  getUser: (getUserDTO: IGetUserDTO) => Promise<UserEntity>;
  createUser: (createUserDTO: ICreateUserDTO) => Promise<UserEntity>;
}

@injectable()
class UsersService implements IUsersService {
  constructor(
    @inject("IUsersRepository")
    public usersRepository: IUsersRepository
  ) {}

  async authenticateUser(authUserDTO: IAuthUserDTO): Promise<UserEntity> {
    const { name, password } = authUserDTO;
    const getUserDTO: IGetUserDTO = new GetUserDTO({ name });

    try {
      const user: UserEntity = await this.usersRepository.getUser(getUserDTO);

      if (compareSync(password, user.password)) {
        delete user.password;
        return user;
      }

      throw new Error("passwords does not much");
    } catch (error) {
      throw new Error(error?.message + " db request problem");
    }
  }

  async getUser(getUserDTO: IGetUserDTO): Promise<UserEntity> {
    try {
      return this.usersRepository.getUser(getUserDTO);
    } catch (error) {
      throw new Error(error?.message + " db request problem");
    }
  }

  async createUser(createUserDTO: ICreateUserDTO): Promise<UserEntity> {
    return this.usersRepository.createUser(createUserDTO);
  }
}

export default UsersService;
