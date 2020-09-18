import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("users", function (table) {
    table.increments('id').primary();
    table.string("name").unique();
    table.string("first_name");
    table.string("second_name");
    table.string("password");
    table.string("role").defaultTo("customer");
    table.string("phone");
    table.string("email").unique();
    table.integer("address_id").references("addresses.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
