import { Knex } from 'knex';
import { env } from '../helpers/env-helper';

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      host: env.string('DB_DEV_HOST', 'localhost'),
      port: env.number('DB_DEV_PORT', 5432),
      database: env.string('DB_DEV_DATABASE', 'template'),
      user: env.string('DB_DEV_USER', 'postgres'),
      password: env.string('DB_DEV_PASS', 'root'),
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
      host: env.string('DB_TEST_HOST', 'localhost'),
      port: env.number('DB_TEST_PORT', 5432),
      database: env.string('DB_TEST_DATABASE', 'template_test'),
      user: env.string('DB_TEST_USER', 'postgres'),
      password: env.string('DB_TEST_PASS', 'root'),
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
      host: env.string('DB_PROD_HOST', 'localhost'),
      port: env.number('DB_PROD_PORT', 5432),
      database: env.string('DB_PROD_DATABASE', 'template'),
      user: env.string('DB_PROD_USER', 'username'),
      password: env.string('DB_PROD_PASS', 'password'),
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
