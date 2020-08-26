import { injectable } from "tsyringe";

export interface ITGTemplater {
  getCheckoutMessageTemplate: (any: any) => any;
}

@injectable()
class TGTemplater implements ITGTemplater {
  constructor() {}

  getCheckoutMessageTemplate({ name, address, comment, cartData }) {
    return encodeURI(`
<b>Hey! You have new Order!</b>
<hr/>
<b>Name</b>: ${name}
<b>Products</b>: ${123}
<b>TotalPrice</b>: ${123}
<b>Address</b>: ${address}
<b>Comment</b>: ${comment}
    `);
  }
}

export default TGTemplater;
