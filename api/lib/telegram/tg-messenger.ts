import { injectable, inject } from "tsyringe";
import axios from "axios";

import { ITGTemplater } from "./tg-templater";
import { IConfig } from "../../components/config";

export interface ITGMessenger {
  sendCheckoutMessage: (any: any) => any;
}

@injectable()
class TGMessenger implements ITGMessenger {
  constructor(
    @inject("ITGTemplater")
    public tgTemplater: ITGTemplater,
    @inject("IConfig") private config: IConfig
  ) {}

  getTgUrl = (tgMessage) =>
    `https://api.telegram.org/bot${this.config.TG_TOKEN}/sendMessage?chat_id=${this.config.TG_CHAT_ID}&parse_mode=html&text=${tgMessage}`;

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
