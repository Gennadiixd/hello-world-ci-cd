import * as Knex from "knex";
import { hashSync } from "bcrypt";

const SALT_ROUNDS = 10;

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert([
    {
      name: "userOne",
      password: hashSync("1234", SALT_ROUNDS),
      role: "customer",
      email: "userOne@mail.com"
    },
    {
      name: "admin",
      password: hashSync("1234", SALT_ROUNDS),
      role: "admin",
      email: "admin@mail.com"
    },
    {
      name: "www",
      password: hashSync("www", SALT_ROUNDS),
      role: "admin",
      email: "www@mail.com"
    },
  ]);
}
