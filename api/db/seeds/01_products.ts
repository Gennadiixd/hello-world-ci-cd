import * as Knex from "knex";
import { generateProducts } from "../utils";

export async function seed(knex: Knex): Promise<void> {
  await knex("products").del();

  await knex("products").insert(generateProducts());
}
