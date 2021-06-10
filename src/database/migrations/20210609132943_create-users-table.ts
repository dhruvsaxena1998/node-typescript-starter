import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.increments("user_id");
    table.integer("role_id").unsigned().notNullable();
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.text("password").notNullable();
    table.string("name").nullable();
    table.boolean("is_verified").defaultTo(false);
    table.text("image").nullable();
    table.timestamps(true, true);

    table.foreign("role_id").references("role_id").inTable("roles");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
