import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("products", function (table) {
    table.string("category", 2000).defaultTo("default_category");
    table.enu("rate", [0, 1, 2, 3, 4, 5]).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("products", function (table) {
    table.dropColumn("category");
    table.dropColumn("rate");
  });
}
