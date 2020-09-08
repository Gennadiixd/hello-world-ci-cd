import { IsNotEmpty } from "class-validator";

export class GetOrdersDTO {
  @IsNotEmpty()
  user_id: number;

  constructor({ userId }) {
    this.user_id = userId;
  }
}
