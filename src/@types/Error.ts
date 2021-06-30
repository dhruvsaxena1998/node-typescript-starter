export interface Error {
  key?: string;
  path?: (string | number)[];
  message: string;
  type: string;
}
