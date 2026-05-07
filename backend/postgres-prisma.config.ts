import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/postgres",
  migrations: {
    path: "prisma/postgres/migrations",
  },
  datasource: {
    url: env("POSTGRES_DATABASE_URL"),
  },
});