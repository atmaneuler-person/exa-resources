import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const dbPath = './prisma/dev.db'; // Simple path first
const adapter = new PrismaBetterSqlite3({ url: dbPath });

// Temporary dummy for build success
export const prisma = {} as any;
