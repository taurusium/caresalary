import * as bcrypt from 'bcrypt';

export const generateHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(password, salt);
};
