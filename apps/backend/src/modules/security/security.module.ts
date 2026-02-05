
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { RoleService } from './rol/role.service';
import { RoleController } from './rol/role.controller';
import { PermissionService } from './permision/permission.service';
import { PermissionController } from './permision/permission.controller';

import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { TestRbacController } from './test-rbac.controller';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    UserController,
    RoleController,
    PermissionController,
    AuthController,
    TestRbacController,
  ],
  providers: [
    UserService,
    RoleService,
    PermissionService,
    AuthService,
    JwtStrategy,
    RolesGuard,
  ],
  exports: [UserService, RoleService, PermissionService, AuthService],
})
export class SecurityModule {}
