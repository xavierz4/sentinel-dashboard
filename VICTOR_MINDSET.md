# VICTOR_MINDSET.md - Base de Conocimiento del Arquitecto

> Este documento contiene el ADN técnico y estratégico de Víctor Pinedo. Hex debe consultar este archivo antes de realizar cualquier commit o mover el tablero.

## 🏛️ Reglas de Oro (Arquitectura)
1. **Primero la Base, luego el Negocio:** Nada de aplicaciones finales (como F10/Bienestar) hasta que el Boilerplate Reusable esté cerrado al 100%.
2. **Boilerplate Reusable:** Debe servir para cualquier MVP futuro. Incluye: Login, RBAC (Roles/Permisos), Notificaciones, Gestión de Archivos, Guardas de Ruta.
3. **Limpieza Absoluta:** No se permiten archivos temporales, comentarios innecesarios o ramas sucias.

## 💻 Estándares de Código (Senior)
1. **Atómico:** Componentes y funciones de menos de 130 líneas.
2. **Rutas:** 
   - Frontend: SOLO rutas absolutas (Aliases: `@modules`, `@shared`, `@core`).
   - Backend: SOLO rutas relativas (`../../`).
3. **Persistencia (Client):** **Zustand** para estado global (Stores). **NO USAR CONTEXT API** para estado complejo.
4. **Persistencia (Server):** TanStack Query para estado de servidor.
5. **Validación:** Centralizada en `@shared/utils/validators`.
6. **Tipado:** Estricto. Prohibido el uso de `any`. Definir interfaces para Payloads y Responses.

## 📡 Historial de Directrices (Audios/Chats)
- *2026-02-02 (22:41):* Enfocarse en la base, no en Bienestar.
- *2026-02-02 (23:11):* Borrar rastro de F10 del tablero. La base debe ser genérica.
- *2026-02-03 (19:44):* "Usamos Zustand en el proyecto, no Context API". (Corrección aplicada en Auth).

## 🎯 Backlog de la Base (Prioridad)
1. [x] Login (Frontend) - Implementado con Zustand.
2. [ ] Guardas de Ruta
3. [ ] Gestión de Roles (UI)
4. [ ] Gestión de Permisos (UI)
5. [ ] Gestión de Archivos
