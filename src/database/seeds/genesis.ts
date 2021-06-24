import { Knex } from 'knex';
import { hash } from '../../helpers/bcrypt';

export const seed = async (knex: Knex): Promise<void> => {
  // Deletes ALL existing entries
  await knex('roles').del();
  await knex('users').del();

  // Inserts seed entries

  //   ROLES
  await knex('roles').insert([
    { name: 'ADMINSTRATOR', description: 'Role given to admin' },
    {
      name: 'AUTHENTICATED',
      description: 'Role given to authenticated users',
    },
    { name: 'PUBLIC', description: 'Role given to public users' },
  ]);

  //   USERS
  const password = await hash('admin');
  await knex('users').insert([
    {
      role: 'AUTHENTICATED',
      username: 'admin',
      email: 'admin@template.io',
      password,
      name: 'Admin',
      confirmed: true,
    },
  ]);
};
