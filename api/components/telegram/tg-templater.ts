import { injectable } from "tsyringe";

export interface ITGTemplater {
  getCheckoutMessageTemplate: (any: any) => any;
}

@injectable()
class TGTemplater implements ITGTemplater {
  constructor() {}

  getCheckoutMessageTemplate({ name, address, comment, cartData }) {
    const { items, totalCount, totalPrice } = cartData;

    const productTitles = Object.values(items).reduce(
      (accum, item: any, index, itemsArray) => {
        const isLast = index === itemsArray.length - 1;
        return `${accum}${item.title} (${item.price}\$ x ${item.count})${
          isLast ? "." : ","
        } `;
      },
      ""
    );

    return encodeURI(`
<b>Hey! You have new Order!</b>

<b>Products</b>: [${productTitles}]
<b>Total Price</b>: ${totalPrice}\$
<b>Total Products</b>: ${totalCount}
<b>Name</b>: ${name}
<b>Address</b>: ${address}
<b>Comment</b>: ${comment}
    `);
  }
}

export default TGTemplater;
