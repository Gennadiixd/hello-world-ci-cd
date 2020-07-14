import { createConnection, Connection } from "typeorm";
import { injectable } from "tsyringe";

export interface IDBConnection {
  connection: Promise<Connection>;
  getConnection: () => Promise<Connection>;
}

@injectable()
class DBConnection implements IDBConnection {
  connection: Promise<Connection>;

  constructor() {
    this.connection = createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + "/components/**/*.entity{.ts,.js}"],
      synchronize: false,
    });
  }

  getConnection() {
    return this.connection;
  }
}

export default DBConnection;
