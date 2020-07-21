import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("users", function (table) {
    table.increments('id').primary();
    table.string("name").unique();
    table.string("password");
    table.string("role");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
