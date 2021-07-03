import { SendMailOptions } from 'nodemailer';

export enum ROLE {
  ADMINSTRATOR = 'ADMINSTRATOR',
  AUTHENTICATED = 'AUTHENTICATED',
  PUBLIC = 'PUBLIC',
}

export type EmailOptions = Omit<SendMailOptions, 'from'>;
