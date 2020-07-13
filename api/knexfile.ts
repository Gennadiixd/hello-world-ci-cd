import config from "config";

const dbConfig = config.get("db") as any;

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: dbConfig.database,
      user: dbConfig.user,
      password: dbConfig.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
