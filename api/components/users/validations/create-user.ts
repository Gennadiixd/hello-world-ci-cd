import { createValidation } from "./utils";

const USER_DATA_FIELDS = {
  userData: ["name", "password", "email", "first_name", "second_name"],
};

const ADDRESS_DATA_FIELDS = {
  addressData: ["city", "index", "street_name", "home_number"],
};

const createUserValidation = [
  ...createValidation(USER_DATA_FIELDS),
  ...createValidation(ADDRESS_DATA_FIELDS),
];

export default createUserValidation;
