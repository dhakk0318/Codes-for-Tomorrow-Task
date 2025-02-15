import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const findUserbyEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const createUser = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
};
export const validatePassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}
