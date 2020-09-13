export class CreateUserDTO {
  userData: any;
  contactData: any;
  addressData: any;

  constructor({ userData, contactData, addressData }) {
    this.userData = userData;
    this.contactData = contactData;
    this.addressData = addressData;
  }
}
