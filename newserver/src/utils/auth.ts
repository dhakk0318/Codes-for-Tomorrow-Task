import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = "your_secret_key";

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET_KEY);
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
