import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("products").del();

  await knex("products").insert([
    { id: 1, name: "name", description: "description", price: "price" },
    { id: 2, name: "name", description: "description", price: "price" },
    { id: 3, name: "name", description: "description", price: "price" },
    { id: 4, name: "name", description: "description", price: "price" },
  ]);
}
