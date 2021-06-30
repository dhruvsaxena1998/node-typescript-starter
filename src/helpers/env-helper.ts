import has from 'lodash/has';
import get from 'lodash/get';

import { configuration } from '../config';

export const env = (key: string, defaultValue: unknown, config = false): unknown => {
  if (config) return has(configuration, key) ? get(configuration, key) : defaultValue;
  return has(process.env, key) ? String(process.env[key]) : defaultValue;
};

env.string = (key: string, defaultValue = '', config = false): string => {
  if (config) return has(configuration, key) ? String(get(configuration, key)) : defaultValue;
  return has(process.env, key) ? String(process.env[key]) : defaultValue;
};

env.number = (key: string, defaultValue = 0, config = false): number => {
  if (config) return has(configuration, key) ? Number(get(configuration, key)) : defaultValue;
  return has(process.env, key) ? Number(process.env[key]) : defaultValue;
};

env.boolean = (key: string, defaultValue = false, config = false): boolean => {
  if (config) return has(configuration, key) || defaultValue;
  return has(process.env, key) || defaultValue;
};
