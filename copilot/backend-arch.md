
## Arquitectura del Backend

Este documento describe la arquitectura, tecnologías y scaffolding actual del backend del proyecto RBAC Bootstrap MVP.

## Tecnologías Usadas
- **Lenguaje:** TypeScript
- **Framework principal:** NestJS v11
- **ORM:** Prisma (gestión principal), TypeORM (alternativo)
- **Base de datos:** MySQL
- **Autenticación:** Passport.js (JWT y local)
- **Hashing de contraseñas:** bcrypt
- **Programación reactiva:** rxjs
- **Testing:** Jest
- **Linting y formato:** ESLint, Prettier

## Arquitectura
- **Modular:** Cada dominio funcional (usuarios, roles, permisos, autenticación) está separado en módulos bajo `apps/backend/src/modules`.
- **Servicios y controladores:** Lógica de negocio en servicios, endpoints en controladores.
- **Persistencia:** Prisma ORM, migraciones y seeds en `apps/backend/prisma/`.
- **Guards personalizados:** Para roles y permisos (`apps/backend/src/common/guards/roles.guard.ts`).
- **Configuración global:** Uso de `ConfigModule` para variables de entorno.

## Scaffolding Actual
```
apps/backend/
├── src/
│   ├── main.ts              # Punto de entrada
│   ├── app.module.ts        # Módulo raíz
│   ├── app.controller.ts    # Endpoint raíz
│   ├── app.service.ts       # Servicio raíz
│   ├── modules/
│   │   ├── prisma/          # Módulo y servicio Prisma
│   │   └── security/
│   │       ├── auth/        # Autenticación (JWT, login, registro)
│   │       ├── user/        # Gestión de usuarios
│   │       ├── rol/         # Gestión de roles
│   │       ├── permision/   # Gestión de permisos
│   │       ├── test-rbac.controller.ts # Endpoints de prueba RBAC
│   │       └── security.module.ts      # Módulo de seguridad
│   └── common/
│       ├── guards/roles.guard.ts       # Guard para roles
│       └── constants/roles.ts          # Constantes de roles
├── prisma/
│   ├── schema.prisma        # Esquema de base de datos
│   ├── migrations/          # Migraciones
│   └── seed.ts              # Seed de datos
├── test/
│   ├── app.e2e-spec.ts      # Pruebas E2E
│   └── jest-e2e.json        # Configuración de pruebas
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración TypeScript
├── tsconfig.build.json      # Configuración build
├── nest-cli.json            # Configuración NestJS CLI
├── eslint.config.mjs        # Configuración ESLint
└── README.md                # Documentación
```

## Scripts Útiles
- `pnpm dev:backend`: Inicia el backend en modo desarrollo
- `pnpm build:backend`: Compila el backend
- `pnpm lint:backend`: Ejecuta ESLint
- `pnpm test`: Ejecuta tests unitarios
- `pnpm test:e2e`: Ejecuta tests end-to-end
- `pnpm seed`: Pobla la base de datos
- `pnpm start:backend:prod`: Inicia backend en producción

## Notas
- El backend implementa RBAC básico, autenticación JWT y gestión modular de usuarios, roles y permisos.
- Prisma gestiona la persistencia y migraciones.
- Guards personalizados para autorización por roles.
