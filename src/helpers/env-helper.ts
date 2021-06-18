import _ from 'lodash';

/**
 * @description Returns either env value from process.env or defaultValue
 */
export class Env {
  public static string(key: string, defaultValue = ''): string {
    return _.has(process.env, key) ? String(process.env[key]) : defaultValue;
  }
  public static number(key: string, defaultValue = 0): number {
    return _.has(process.env, key) ? Number(process.env[key]) : defaultValue;
  }
  public static bool(key: string, defaultValue = false): boolean {
    return _.has(process.env, key) ? Boolean(process.env[key]) : defaultValue;
  }
}

export const env = Env;
