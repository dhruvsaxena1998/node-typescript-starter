import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('roles', (table: Knex.TableBuilder) => {
    table.increments('role_id');
    table.string('name').notNullable().unique();
    table.text('description').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('roles');
}
