import bcrypt from 'bcryptjs';

const saltRounds = 13;

export const hash = async (str: string, rounds = saltRounds): Promise<string> => {
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(str, salt);
};

export const compare = async (str: string, hash = ''): Promise<boolean> => {
  return bcrypt.compare(str, hash);
};
