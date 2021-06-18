import _ from 'lodash';

export const env = (key: string, defaultValue = ''): string => {
  return _.has(process.env, key) ? (process.env[key] as string) : defaultValue;
};
