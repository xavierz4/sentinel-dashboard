// Endpoints para la entidad usuario
export const USER_ENDPOINTS = {
  base: '/security/users',
  byId: (id: number) => `/security/users/${id}`,
  roles: (id: number) => `/security/users/${id}/roles`,
  addRole: (id: number, roleId: number) => `/security/users/${id}/roles/${roleId}`,
  removeRole: (id: number, roleId: number) => `/security/users/${id}/roles/${roleId}`,
};
