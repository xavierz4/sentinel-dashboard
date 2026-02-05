import { Controller, Get, Param, Post, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import type { Role } from '@prisma/client';

@Controller('security/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAll(): Promise<Role[]> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Role | null> {
    return await this.roleService.findOne(id);
  }

  @Post()
  async create(@Body() body: Partial<Role>): Promise<Role> {
    return await this.roleService.create(body as any);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    try {
      await this.roleService.remove(id);
      return { deleted: true };
    } catch {
      return { deleted: false };
    }
  }
}
