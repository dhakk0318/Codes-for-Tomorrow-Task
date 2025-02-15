import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const activeSessions = new Map();

export const register = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  if (activeSessions.has(user.id)) {
    activeSessions.delete(user.id);
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  activeSessions.set(user.id, token);
  res
    .cookie("token", token, { httpOnly: true })
    .json({ message: "Logged in successfully" });
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ error: "Not logged in" });
  const decoded: any = jwt.verify(token, JWT_SECRET);
  activeSessions.delete(decoded.id);
  res.clearCookie("token").json({ message: "Logged out successfully" });
};
