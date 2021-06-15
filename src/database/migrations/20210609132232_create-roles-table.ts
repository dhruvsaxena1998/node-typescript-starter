import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('roles', (table: Knex.TableBuilder) => {
    table.increments('role_id');
    table.string('name').notNullable().unique();
    table.text('description').nullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('roles');
};
