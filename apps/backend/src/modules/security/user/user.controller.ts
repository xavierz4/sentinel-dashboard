import { Controller, Get, Param, Post, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../test-rbac.controller';
import { UserService } from './user.service';
import type { User } from '@prisma/client';

@Controller('security/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return await this.userService.findOne(id);
  }

  @Post()
  async create(@Body() body: Partial<User>): Promise<User> {
    return await this.userService.create(body as any);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    try {
      await this.userService.remove(id);
      return { deleted: true };
    } catch {
      return { deleted: false };
    }
  }
  // Listar roles de un usuario
  @Get(':id/roles')
  @UseGuards(RolesGuard)
  @Roles('admin', 'super-admin')
  async getRoles(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getRoles(id);
  }

  // Asignar rol a usuario
  @Post(':id/roles/:roleId')
  @UseGuards(RolesGuard)
  @Roles('admin', 'super-admin')
  async addRole(
    @Param('id', ParseIntPipe) id: number,
    @Param('roleId', ParseIntPipe) roleId: number
  ) {
    return await this.userService.addRole(id, roleId);
  }

  // Quitar rol a usuario
  @Delete(':id/roles/:roleId')
  @UseGuards(RolesGuard)
  @Roles('admin', 'super-admin')
  async removeRole(
    @Param('id', ParseIntPipe) id: number,
    @Param('roleId', ParseIntPipe) roleId: number
  ) {
    return await this.userService.removeRole(id, roleId);
  }
}
