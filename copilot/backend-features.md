# Estado de Features - Bootstrap MVP (RBAC)

Este documento detalla las funcionalidades (features) actuales y pendientes del sistema RBAC, indicando su estado.

## Leyenda de Estado
| Estado      | Significado   |
|-------------|--------------|
| ✅          | Completada    |
| 🟡          | En progreso   |
| ⬜          | Por hacer     |

---

## Backend

### Gestión de Usuarios
| Feature                        | Estado |
|--------------------------------|--------|
| Listar usuarios                | ✅     |
| Obtener usuario por ID         | ✅     |
| Crear usuario                  | ✅     |
| Eliminar usuario               | ✅     |
| Editar usuario                 | ⬜     |
| Buscar usuario (filtros)       | ⬜     |
| Listar roles de un usuario     | ✅     |
| Asignar rol a usuario          | ✅     |
| Quitar rol a usuario           | ✅     |

### Gestión de Roles
| Feature                              | Estado |
|--------------------------------------|--------|
| Listar roles                         | ✅     |
| Obtener rol por ID                   | ✅     |
| Crear rol                            | ✅     |
| Eliminar rol                         | ✅     |
| Editar rol                           | ⬜     |
| Listar usuarios de un rol (revisar)  | ✅     |

### Gestión de Permisos
| Feature                        | Estado |
|--------------------------------|--------|
| Listar permisos                | ✅     |
| Obtener permiso por ID         | ✅     |
| Crear permiso                  | ✅     |
| Eliminar permiso               | ✅     |
| Editar permiso                 | ⬜     |
| Asignar permiso a rol          | ⬜     |
| Quitar permiso de rol          | ⬜     |

### Autenticación y Autorización
| Feature                        | Estado |
|--------------------------------|--------|
| Registro de usuario            | ✅     |
| Login con email y contraseña   | ✅     |
| Autenticación JWT              | ✅     |
| Guards de roles y permisos     | ✅     |
| Endpoints protegidos           | ✅     |
| Flujo de recuperación de contraseña | ⬜ |
| Mejorar manejo de sesiones/logout   | ⬜ |

---

## Frontend
| Feature                                 | Estado |
|-----------------------------------------|--------|
| Revisión de features implementadas       | 🟡     |

---

## Observaciones
- El modelo de datos y endpoints cubren la base de un sistema RBAC.
- Faltan endpoints para edición y asignación de permisos a roles.
- Revisar y documentar el frontend.

> Actualizado al 25 de diciembre de 2025.
