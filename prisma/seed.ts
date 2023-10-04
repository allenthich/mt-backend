import { PrismaClient, Prisma } from '@prisma/client'
import { fakeUsers } from './data'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = fakeUsers

async function main() {
  // Purge existing records in the database

  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
      include: {
        tasks: true, // Include all tasks in the returned object as a related record
      },
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
