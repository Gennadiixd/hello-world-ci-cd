import * as Knex from "knex";
// import { hashSync } from "bcrypt";

const SALT_ROUNDS = 10;

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert([
    {
      name: "userOne",
      password: "1234",
      // password: hashSync("1234", SALT_ROUNDS),
      role: "customer",
    },
    {
      name: "admin",
      password: "1234",
      // password: hashSync("1234", SALT_ROUNDS),
      role: "admin",
    },
  ]);
}
