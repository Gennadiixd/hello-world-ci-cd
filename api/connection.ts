import { createConnection } from "typeorm";

const plug = { manager: { find: () => {} } };

export const connection =
  process.env.NODE_ENV === "test"
    ? plug
    : createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + "/components/**/*.entity{.ts,.js}"],
        synchronize: !!process.env.TYPEORM_SYNC,
      });
