import bcrypt from "bcryptjs";

export async function enreypt(password: string) {
  return await bcrypt.hash(password, 12);
}

export async function decrypt(password: string, hashedPassword: string) {
  return await bcrypt.hash(password, hashedPassword);
}
