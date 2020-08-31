import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("orders", function (table) {
    table.increments("id").primary();
    table.integer("price");
    table.integer("user_id");
    table.foreign("user_id").references("id").inTable("users");
    table.specificType("products_id", "integer ARRAY");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders");
}
