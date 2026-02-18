import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
    adapter: process.env.DATABASE_URL ? undefined : undefined, // Placeholder for now
    accelerateUrl: undefined
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db