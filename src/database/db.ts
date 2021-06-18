import knex from 'knex';
import configs from './knexfile';
import { env } from '../helpers/env-helper';

const environment = env.string('NODE_ENV', 'development');
const config = configs[environment];

export const database = knex(config);
