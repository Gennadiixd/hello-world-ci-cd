import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("products").del();

  await knex("products").insert([
    { id: 1, title: "title", description: "description", price: "price" },
    { id: 2, title: "title", description: "description", price: "price" },
    { id: 3, title: "title", description: "description", price: "price" },
    { id: 4, title: "title", description: "description", price: "price" },
  ]);
}
