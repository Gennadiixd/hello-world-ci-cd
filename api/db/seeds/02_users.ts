import * as Knex from "knex";
import bcrypt  from "bcrypt";

bcrypt.hashSync('aaaa', 10);

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert([
    {
      name: "userOne",
      password: "1234",
      role: "customer",
    },
    {
      name: "admin",
      password: "1234",
      role: "admin",
    },
  ]);
}
