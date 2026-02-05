export const ROLE_NAMES = ['super-admin', 'admin', 'user'] as const;
export type RoleName = typeof ROLE_NAMES[number];

export const ROLE = {
  SUPER_ADMIN: 'super-admin',
  ADMIN: 'admin',
  USER: 'user',
} as const;
