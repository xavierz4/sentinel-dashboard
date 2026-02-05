import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
  return this.prisma.user.findMany();
  }

  findOne(id: number) {
  return this.prisma.user.findUnique({ where: { id } });
  }

  async create(payload: { username?: string; email?: string; password?: string }) {
    // Se asume que el password ya viene hasheado
    return this.prisma.user.create({ data: payload as any });
  }

  remove(id: number) {
  return this.prisma.user.delete({ where: { id } });
  }
  
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  
  async addRole(userId: number, roleId: number) {
    return this.prisma.userRole.create({ data: { userId, roleId } });
  }

  async removeRole(userId: number, roleId: number) {
    return this.prisma.userRole.delete({ where: { userId_roleId: { userId, roleId } } });
  }

  async getRoles(userId: number) {
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { role: true },
    });
    return userRoles.map(ur => ur.role);
  }
}
