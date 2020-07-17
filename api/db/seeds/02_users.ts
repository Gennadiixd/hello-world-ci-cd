import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert([
    {
      id: 1,
      name: "userOne",
      password: "1234",
      role: "customer",
    },
    {
      id: 2,
      name: "admin",
      password: "1234",
      role: "admin",
    },
  ]);
}
