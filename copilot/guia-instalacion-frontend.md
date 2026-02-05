# Guía rápida de instalación de dependencias para el frontend

Esta guía te ayudará a instalar las dependencias necesarias únicamente para el proyecto de frontend usando pnpm y el filtro `--filter`.

## Requisitos previos
- Tener instalado [Node.js](https://nodejs.org/) (recomendado LTS)
- Tener instalado [pnpm](https://pnpm.io/)

## Instalación de dependencias

1. Abre una terminal en la raíz del proyecto.
2. Ejecuta el siguiente comando para instalar solo las dependencias del frontend:

```bash
pnpm install --filter frontend
```

Esto instalará únicamente las dependencias del paquete `frontend` definido en el monorepo.

## Verificación
- Para verificar que la instalación fue exitosa, revisa que la carpeta `node_modules` esté presente dentro de `apps/frontend`.
- Puedes ejecutar el proyecto con:
  ```bash
  pnpm --filter frontend dev
  ```

---