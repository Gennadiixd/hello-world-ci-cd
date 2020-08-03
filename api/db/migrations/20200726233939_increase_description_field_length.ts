import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("products", function (table) {
    table.string("description", 2000).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("products", function (table) {
    table.string("description", 255).alter();
  });
}
