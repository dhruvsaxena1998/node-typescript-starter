import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.uuid("id").primary().notNullable().unique();
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.text("password").notNullable();
    table.uuid("roleId").references("id").inTable("roles");
    table.string("name").nullable();
    table.boolean("is_verified").defaultTo(false);
    table.text("image").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {}
