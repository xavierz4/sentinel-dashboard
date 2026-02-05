import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.role.findMany();
  }

  findOne(id: number) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  create(payload: { name: string }) {
    return this.prisma.role.create({ data: payload });
  }

  remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
