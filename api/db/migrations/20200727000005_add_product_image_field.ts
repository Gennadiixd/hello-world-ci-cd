import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("products", function (table) {
    table.string("image", 2000).defaultTo("default_image");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("products", function (table) {
    table.dropColumn("image");
  });
}