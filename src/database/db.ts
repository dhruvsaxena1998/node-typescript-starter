import knex from 'knex';
import configs from './knexfile';
import { env } from '../helpers/common';

const environment = env('NODE_ENV', 'development');
const config = configs[environment];

export const database = knex(config);
