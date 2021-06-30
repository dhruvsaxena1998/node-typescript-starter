import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments('user_id');
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.text('password').notNullable();
    table.string('name').nullable();
    table.string('role').unsigned().notNullable();
    table.text('image').nullable();

    table.boolean('confirmed').defaultTo(false);
    table.boolean('blocked').defaultTo(false);
    table.string('confirmation_token').nullable().defaultTo('');
    table.string('reset_password_token').nullable().defaultTo('');

    table.timestamps(true, true);

    table.foreign('role').references('name').inTable('roles');
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('users');
};
