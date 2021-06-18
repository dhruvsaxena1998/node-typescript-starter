import { Knex } from 'knex';
import { env } from '../helpers/common';

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      database: env('DB_DEV_DATABASE', 'template'),
      user: env('DB_DEV_USER', 'postgres'),
      password: env('DB_DEV_PASS', 'root'),
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
      database: env('DB_TEST_DATABASE', 'template_test'),
      user: env('DB_TEST_USER', 'postgres'),
      password: env('DB_TEST_PASS', 'root'),
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
      database: env('DB_PROD_DATABASE', 'template'),
      user: env('DB_PROD_USER', 'username'),
      password: env('DB_PROD_PASS', 'password'),
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

/*
 * export default is required for knex to resolve
 * Knex required configuration option 'client' is missing error
 */
// eslint-disable-next-line no-eval
export default configs;
