import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("products", function (table) {
    table.integer("price").alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("products", function (table) {
    table.string("price").alter();
  });
}
