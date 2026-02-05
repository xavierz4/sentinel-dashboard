import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RoleService } from '../rol/role.service';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ROLE_NAMES } from '../../../common/constants/roles';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      // Exclude password from returned user
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(body: { email: string; password: string; username?: string }) {
    // Hash password and create user
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await this.userService.create({
      email: body.email,
      password: hashedPassword,
      username: body.username,
    });
    // Crear roles base si no existen
    const roles: Record<string, any> = {};
    for (const name of ROLE_NAMES) {
      let role = await this.prisma.role.findUnique({ where: { name } });
      if (!role) {
        role = await this.prisma.role.create({ data: { name } });
      }
      roles[name] = role;
    }
    // Asignar solo el rol 'user' al nuevo usuario
    await this.prisma.userRole.create({ data: { userId: user.id, roleId: roles['user'].id } });
    // Exclude password from returned user
    const { password, ...result } = user;
    return result;
  }

  async logout() {
    // JWT es stateless, así que el logout es responsabilidad del cliente (borrar token)
    // Aquí solo devolvemos un mensaje estándar
    return { message: 'Logout successful. Please remove the token on client side.' };
  }
}
