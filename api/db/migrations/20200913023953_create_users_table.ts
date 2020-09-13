import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("users", function (table) {
    table.increments('id').primary();
    table.string("name").unique();
    table.string("password");
    table.string("role");
    table.integer("address_id").references("addresses.id");
    table.integer("contact_id").references("contacts.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
