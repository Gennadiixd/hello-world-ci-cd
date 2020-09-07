import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("orders", function (table) {
    table.increments("id").primary();
    table.integer("total_price");
    table.integer("total_products_count");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders");
}
