import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de Admin...');

  // 1. Asegurar Roles
  const roles = ['admin', 'user', 'trabajador_social', 'coordinador'];
  
  for (const roleName of roles) {
    const role = await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
    console.log(`✅ Rol asegurado: ${role.name}`);
  }

  // 2. Crear Usuario Admin
  const email = 'admin@hex.com';
  const password = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email },
    update: { password }, // Actualizar pass si ya existe
    create: {
      email,
      password,
      username: 'HexAdmin',
    },
  });
  console.log(`✅ Usuario creado: ${admin.email}`);

  // 3. Asignar Rol Admin
  const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
  
  if (adminRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: admin.id, roleId: adminRole.id } },
      update: {},
      create: { userId: admin.id, roleId: adminRole.id },
    });
    console.log(`✅ Rol 'admin' asignado al usuario.`);
  }

  console.log('🚀 Seed completado exitosamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
