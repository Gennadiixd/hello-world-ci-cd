import { createConnection } from "typeorm";

export const connection = createConnection({
  type: "postgres",
  host: process.env.DB_HOSTNAME,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/../components/**/*.entity{.ts,.js}"],
  synchronize: !!process.env.TYPEORM_SYNC,
});
