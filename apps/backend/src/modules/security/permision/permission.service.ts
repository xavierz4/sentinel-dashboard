import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.permission.findMany();
  }

  findOne(id: number) {
    return this.prisma.permission.findUnique({ where: { id } });
  }

  create(payload: { name: string }) {
    return this.prisma.permission.create({ data: payload });
  }

  remove(id: number) {
    return this.prisma.permission.delete({ where: { id } });
  }
}
