import { Repository, EntityRepository, Connection } from "typeorm";
import { injectable, inject } from "tsyringe";

import { UserEntity } from "./user.entity";
import { IDBConnection } from "../../db/connection";
import { AddressEntity } from "./address.entity";
import { ICreateUserDTO, IAddressData } from "./dto/create-user.dto";
import { IGetUserDTO } from "./dto/get-user.dto";

export interface IUsersRepository {
  getUser: (getUserDTO: IGetUserDTO) => Promise<UserEntity>;
  createUser: (createUserDTO: ICreateUserDTO) => Promise<UserEntity>;
}

@injectable()
@EntityRepository(UserEntity)
class UsersRepository
  extends Repository<UserEntity>
  implements IUsersRepository {
  constructor(@inject("IDBConnection") private dbConnection: IDBConnection) {
    super();
  }

  async getRepository(): Promise<Repository<UserEntity>> {
    const connection: Connection = await this.dbConnection.getConnection();
    return connection.getRepository(UserEntity);
  }

  async getUser(getUserDTO: IGetUserDTO): Promise<UserEntity> {
    const repository: Repository<UserEntity> = await this.getRepository();
    const user: UserEntity = await repository.findOne(getUserDTO.params);

    return user;
  }

  async createUser(createUserDTO: ICreateUserDTO): Promise<UserEntity> {
    const { userData, addressData } = createUserDTO;
    const address: AddressEntity = await this.createAddress(addressData);

    const { name, password, first_name, second_name, email } = userData;
    const user: UserEntity = new UserEntity();

    user.address_id = address.id;
    user.name = name;
    user.first_name = first_name;
    user.second_name = second_name;
    user.password = password;
    user.email = email;

    await user.save();

    return user;
  }

  async createAddress(addressData: IAddressData): Promise<AddressEntity> {
    const { city, street_name, home_number, index } = addressData;
    const address: AddressEntity = new AddressEntity();

    address.city = city;
    address.street_name = street_name;
    address.home_number = home_number;
    address.index = index;

    await address.save();

    return address;
  }
}

export default UsersRepository;
