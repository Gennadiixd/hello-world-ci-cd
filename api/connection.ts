import { createConnection } from "typeorm";
import config from "config";

const dbConfig = config.get("db") as any;

export const connection = createConnection({
  type: dbConfig.type,
  host: process.env.DB_HOSTNAME || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_NAME || dbConfig.database,
  entities: [__dirname + "/../components/**/*.entity{.ts,.js}"],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
});
