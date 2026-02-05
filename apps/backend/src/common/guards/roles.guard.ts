import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles required, endpoint público
    }
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) throw new ForbiddenException('No token provided');
    const token = authHeader.replace('Bearer ', '');
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new ForbiddenException('Invalid token');
    }
    // Buscar roles del usuario
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId: payload.sub },
      include: { role: true },
    });
    const userRoleNames = userRoles.map(ur => ur.role.name);
    // super-admin tiene acceso a todo
    if (userRoleNames.includes('super-admin')) return true;
    // Validar si el usuario tiene alguno de los roles requeridos
    const hasRole = requiredRoles.some(role => userRoleNames.includes(role));
    if (!hasRole) throw new ForbiddenException('Insufficient role');
    // Si es admin y la acción es eliminar, denegar
    if (userRoleNames.includes('admin') && request.method === 'DELETE' && !requiredRoles.includes('super-admin')) {
      throw new ForbiddenException('Admins cannot delete');
    }
    return true;
  }
}
