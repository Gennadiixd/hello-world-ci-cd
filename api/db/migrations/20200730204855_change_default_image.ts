import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("products", function (table) {
    table.string("image").defaultTo("/images/product/default_image").alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("products", function (table) {
    table.string("image").defaultTo("default_image").alter();
  });
}
