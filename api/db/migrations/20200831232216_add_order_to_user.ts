import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", function (table) {
    table.specificType("order_ids", "integer ARRAY");
    table.foreign("order_ids").references("id").inTable("orders");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("order_ids");
  });
}
