import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const { Pool } = pg

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// Use a singleton pattern that can be easily mocked in tests
export let prisma = new PrismaClient({ adapter })

export const setPrisma = (newPrisma: any) => {
  prisma = newPrisma
}
