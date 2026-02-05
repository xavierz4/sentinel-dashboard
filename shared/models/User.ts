export interface User {
  id: number;
  email: string;
  password: string;
  username?: string;
  createdAt: string; // ISO date string
  roles?: UserRole[];
}

export interface UserRole {
  userId: number;
  roleId: number;
  role?: Role;
}

export interface Role {
  id: number;
  name: string;
  permissions?: RolePermission[];
}

export interface RolePermission {
  roleId: number;
  permissionId: number;
  permission?: Permission;
}

export interface Permission {
  id: number;
  name: string;
}
