// The PrismaClient singleton — already set up. Import this everywhere.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
