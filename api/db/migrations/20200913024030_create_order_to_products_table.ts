import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("order_to_products", function (
    table
  ) {
    table.primary(["order_id", "product_id"]);
    table.integer("order_id");
    table.foreign("order_id").references("orders.id");
    table.integer("product_id");
    table.foreign("product_id").references("products.id");
    table.integer("product_quantity");
    table.integer("product_price");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("order_to_products");
}
