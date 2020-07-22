import { Repository, EntityRepository } from "typeorm";
import { injectable, inject } from "tsyringe";

import { UserEntity } from "./user.entity";
import { IDBConnection } from "../../connection";

export interface IUsersRepository {
  getUser: (loginDTO) => any;
}

@injectable()
@EntityRepository(UserEntity)
class UsersRepository extends Repository<any> {
  constructor(@inject("IDBConnection") private dbConnection: IDBConnection) {
    super();
  }

  async getUser(getUserDTO) {
    const connect = await this.dbConnection.getConnection();
    const repository = connect.getRepository(UserEntity);
    const user = await repository.findOne(getUserDTO);

    return user;
  }
}

export default UsersRepository;