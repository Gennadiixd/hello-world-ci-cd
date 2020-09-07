import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("products", function (table) {
    table.increments('id').primary();
    table.string("title");
    table.integer("price");
    table.string("description", 2000);
    table.string("image").defaultTo("/images/product/default_image");
    table.string("category", 2000).defaultTo("default_category");
    table.enu("rate", [0, 1, 2, 3, 4, 5]).defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("products");
}
