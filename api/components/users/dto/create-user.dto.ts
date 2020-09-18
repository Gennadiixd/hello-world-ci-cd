export interface IUserData {
  name?: string;
  password: string;
  address_id: string;
  email: string;
  first_name: string;
  second_name: string;
}

export interface IAddressData {
  city: string;
  street_name: string;
  home_number: string;
  index: string;
}

export interface ICreateUserDTO {
  userData: IUserData;
  addressData: IAddressData;
}

export class CreateUserDTO implements ICreateUserDTO {
  userData: IUserData;
  addressData: IAddressData;

  constructor({ userData, addressData }) {
    this.userData = userData;
    this.addressData = addressData;
  }
}
