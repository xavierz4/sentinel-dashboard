import { Controller, Get, Post, Delete, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SetMetadata } from '@nestjs/common';

// Decorador para roles
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('test')
export class TestRbacController {
  // Endpoint público
  @Get('public')
  getPublic() {
    return { message: 'Este endpoint es público' };
  }

  // Endpoint privado: solo user, admin, super-admin
  @Get('private')
  @UseGuards(RolesGuard)
  @Roles('user', 'admin', 'super-admin')
  getPrivate() {
    return { message: 'Solo user, admin o super-admin pueden ver esto' };
  }

  // Endpoint solo admin y super-admin
  @Post('admin')
  @UseGuards(RolesGuard)
  @Roles('admin', 'super-admin')
  postAdmin() {
    return { message: 'Solo admin o super-admin pueden hacer esto' };
  }

  // Endpoint solo super-admin
  @Delete('super')
  @UseGuards(RolesGuard)
  @Roles('super-admin')
  deleteSuper() {
    return { message: 'Solo super-admin puede eliminar' };
  }
}
