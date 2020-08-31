import { injectable } from "tsyringe";

export interface IConfig {
  SESSION_LIFETIME: number;
  TOKEN_NAME: string;
  TG_TOKEN: string;
  TG_CHAT_ID: string;
}

@injectable()
class Config implements IConfig {
  TOKEN_NAME = "claims";
  SESSION_LIFETIME = 24 * 60 * 60 * 1000;

  TG_TOKEN = process.env.TG_TOKEN;
  TG_CHAT_ID = process.env.TG_CHAT_ID;
}

export default Config;
