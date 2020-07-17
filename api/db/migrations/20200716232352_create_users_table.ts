import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("users", function (table) {
    table.increments().primary();
    table.string("name");
    table.string("password");
    table.string("role");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
