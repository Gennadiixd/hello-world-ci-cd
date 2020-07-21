import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("products", function (table) {
    table.increments('id').primary();
    table.string("title");
    table.string("price");
    table.string("description");
    // table.timestamp("created_at").defaultTo(knex.fn.now());
    // table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("products");
}
