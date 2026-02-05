# Bootstrap MVP - Monorepo

Monorepo que contiene el backend (NestJS) y frontend (React + Vite) para el proyecto Bootstrap MVP con autenticación, autorización y RBAC básico.

## Estructura del Proyecto

```
/
├── apps/
│   ├── backend/     # API Backend con NestJS
│   └── frontend/    # Aplicación Frontend con React + Vite
├── packages/        # Librerías compartidas (opcional)
├── copilot/         # Documentación y contexto
└── node_modules/    # Dependencias centralizadas
```

## Requisitos

- Node.js >= 20.19.0
- pnpm >= 8.0.0

## Instalación

Desde la raíz del monorepo:

```bash
pnpm install
```

## Scripts Disponibles

### Desarrollo

```bash
# Iniciar backend y frontend simultáneamente
pnpm dev

# Iniciar solo el backend (NestJS en modo watch)
pnpm dev:backend

# Iniciar solo el frontend (Vite dev server)
pnpm dev:frontend
```

### Build

```bash
# Compilar ambos proyectos
pnpm build

# Compilar solo el backend
pnpm build:backend

# Compilar solo el frontend
pnpm build:frontend
```

### Testing (Backend)

```bash
# Ejecutar tests unitarios
pnpm test

# Ejecutar tests end-to-end
pnpm test:e2e

# Ejecutar tests con cobertura
pnpm test:cov
```

### Linting

```bash
# Ejecutar linting en ambos proyectos
pnpm lint

# Linting solo del backend
pnpm lint:backend

# Linting solo del frontend
pnpm lint:frontend
```

### Base de Datos (Backend)

```bash
# Ejecutar seed de la base de datos
pnpm seed
```

### Producción

```bash
# Iniciar backend en modo producción
pnpm start:backend:prod
```

## Desarrollo en las Apps Individuales

También puedes trabajar dentro de cada aplicación:

```bash
# Backend
cd apps/backend
pnpm dev
pnpm test
pnpm seed

# Frontend
cd apps/frontend
pnpm dev
pnpm build
pnpm preview
```

## Tecnologías

### Backend

- NestJS 11
- Prisma ORM
- TypeORM
- MySQL
- Passport.js (JWT + Local)
- bcrypt
- Jest (testing)

### Frontend

- React 19
- Vite 7
- TypeScript
- ESLint

## Autores

- Victor Pinedo
- Jose Javier Soto Torres

## Licencia

UNLICENSED
