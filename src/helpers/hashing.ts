import bcrypt from "bcryptjs";

const saltRounds = 13;

export const hash = async (str: string, rounds = saltRounds) => {
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(str, salt);
};

export const compare = async (str: string, hash: string = "") => {
  return bcrypt.compare(str, hash);
};

export default { hash, compare };
