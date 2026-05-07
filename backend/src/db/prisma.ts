import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.POSTGRES_DATABASE_URL;

if (!connectionString) {
  throw new Error("POSTGRES_DATABASE_URL is not defined in environment variables.");
}

const adapter = new PrismaPg({
  connectionString,
});

export const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "production"
      ? ["error"]
      : ["query", "info", "warn", "error"],
});