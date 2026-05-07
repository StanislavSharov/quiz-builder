import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
export declare const prisma: PrismaClient<{
    adapter: PrismaPg;
    log: ("error" | "query" | "info" | "warn")[];
}, "error" | "query" | "info" | "warn", import("@prisma/client/runtime/client").DefaultArgs>;
//# sourceMappingURL=prisma.d.ts.map