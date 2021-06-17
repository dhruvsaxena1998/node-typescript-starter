import { Knex } from 'knex';

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'template',
      user: 'postgres',
      password: 'root',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      database: 'template_test',
      user: 'postgres',
      password: 'root',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'template_production',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

/**
 * export default is required for knex to resolve
 * Knex required configuration option 'client' is missing error
 */
// eslint-disable-next-line no-eval
export default configs;
