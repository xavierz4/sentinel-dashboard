import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('users', await prisma.user.count())
  console.log('roles', await prisma.role.count())
  console.log('permissions', await prisma.permission.count())
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
