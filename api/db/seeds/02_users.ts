import * as Knex from "knex";
import { hashSync } from "bcrypt";

const saltRounds = parseInt(process.env.BCRYPT_ROUNDS, 10);

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert([
    {
      name: "userOne",
      password: hashSync("1234", saltRounds),
      role: "customer",
    },
    {
      name: "admin",
      password: hashSync("1234", saltRounds),
      role: "admin",
    },
  ]);
}
