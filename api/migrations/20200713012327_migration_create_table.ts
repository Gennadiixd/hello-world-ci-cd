import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", function (table) {
    table.increments().primary();
    table.string("name", 255).notNullable();
    table.string("price", 255).notNullable();
    table.string("description", 255).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("products");
}
