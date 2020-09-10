import { Repository, EntityRepository } from "typeorm";
import { injectable, inject } from "tsyringe";

import { UserEntity } from "./user.entity";
import { IDBConnection } from "../../db/connection";

export interface IUsersRepository {
  getUser: (loginDTO) => any;
}

@injectable()
@EntityRepository(UserEntity)
class UsersRepository extends Repository<any> {
  constructor(@inject("IDBConnection") private dbConnection: IDBConnection) {
    super();
  }

  async getRepository() {
    const connection = await this.dbConnection.getConnection();
    return connection.getRepository(UserEntity);
  }

  async getUser(name) {
    const repository = await this.getRepository();
    const user = await repository.findOne({ name });

    return user;
  }
}

export default UsersRepository;
