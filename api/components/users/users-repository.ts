import { Repository, EntityRepository, getManager } from "typeorm";
import { injectable, inject } from "tsyringe";

import { UserEntity } from "./user.entity";
import { IDBConnection } from "../../db/connection";
import { AddressEntity } from "./address.entity";
import { ContactEntity } from "./contact.entity";

export interface IUsersRepository {
  getUser: (loginDTO) => any;
  createUser: (createUserDTO) => any;
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

  async getUser(getUserDTO) {
    const repository = await this.getRepository();
    const user = await repository.findOne(getUserDTO.params);

    return user;
  }

  async createUser(createUserDTO) {
    const { userData, addressData, contactData } = createUserDTO;
    const address = await this.createAddress(addressData);
    const contact = await this.createContact(contactData);

    const { name, password, role } = userData;
    const user = new UserEntity();

    user.address_id = address.id;
    user.contact_id = contact.id;
    user.name = name;
    user.password = password;
    user.role = role;

    await user.save();

    return user;
  }

  async createContact(contactData) {
    const { name, surname, phone, email } = contactData;
    const contact = new ContactEntity();

    contact.name = name;
    contact.surname = surname;
    contact.phone = phone;
    contact.email = email;

    await contact.save();

    return contact;
  }

  async createAddress(addressData) {
    const { city, street, index } = addressData;
    const address = new AddressEntity();

    address.city = city;
    address.street = street;
    address.index = index;

    await address.save();

    return address;
  }
}

export default UsersRepository;
