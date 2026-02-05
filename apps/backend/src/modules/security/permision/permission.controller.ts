import { Controller, Get, Param, Post, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { PermissionService } from './permission.service';
import type { Permission } from '@prisma/client';

@Controller('security/permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async getAll(): Promise<Permission[]> {
    return await this.permissionService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Permission | null> {
    return await this.permissionService.findOne(id);
  }

  @Post()
  async create(@Body() body: Partial<Permission>): Promise<Permission> {
    return await this.permissionService.create(body as any);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    try {
      await this.permissionService.remove(id);
      return { deleted: true };
    } catch {
      return { deleted: false };
    }
  }
}
