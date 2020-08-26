import { injectable, inject } from "tsyringe";
import axios from "axios";

import { ITGTemplater } from "./tg-templater";
import { TG_TOKEN, TG_CHAT_ID } from "../../constants";

export interface ITGMessenger {
  sendCheckoutMessage: (any: any) => any;
}

@injectable()
class TGMessenger implements ITGMessenger {
  constructor(
    @inject("ITGTemplater")
    public tgTemplater: ITGTemplater
  ) {}

  getTgUrl = (tgMessage) =>
    `https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&parse_mode=html&text=${tgMessage}`;

  sendCheckoutMessage({ name, address, comment, cartData }) {
    const tgMessage = this.tgTemplater.getCheckoutMessageTemplate({
      name,
      address,
      comment,
      cartData,
    });

    axios.post(this.getTgUrl(tgMessage));
  }
}

export default TGMessenger;
