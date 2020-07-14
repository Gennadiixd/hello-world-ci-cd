import { createConnection, Connection } from "typeorm";
import { injectable } from "tsyringe";

interface IMockConnection {
  manager: {
    find: () => any;
  };
}

const mockConnection: Promise<IMockConnection> = Promise.resolve({
  manager: {
    find: () => {
      return [1, 2, 3, 5];
    },
  },
});

export interface IDBConnection {
  connection: Promise<Connection> | Promise<IMockConnection>;
  getConnection: () => Promise<Connection> | Promise<IMockConnection>;
}

@injectable()
class DBConnection implements IDBConnection {
  connection: Promise<Connection> | Promise<IMockConnection>;

  constructor() {
    this.connection =
      process.env.NODE_ENV === "test"
        ? mockConnection
        : createConnection({
            type: "postgres",
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + "/components/**/*.entity{.ts,.js}"],
            synchronize: false
          });
  }

  getConnection() {
    return this.connection;
  }
}

export default DBConnection;
