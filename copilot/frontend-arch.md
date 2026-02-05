# Arquitectura del Frontend

Este documento describe la arquitectura, tecnologías y scaffolding actual del frontend del proyecto RBAC Bootstrap MVP.

## Tecnologías Usadas
- **Framework:** React 18
- **Build Tool:** Vite 7
- **Lenguaje:** JavaScript (JSX)
- **UI Kit:** Tabler React (componentes básicos)
- **Iconos:** @tabler/icons-react
- **Gestión de estado y datos:** TanStack Query
- **Linting:** ESLint (React Hooks, React Refresh)
- **Plugin de Vite:** @vitejs/plugin-react

## Estructura de Carpetas
```
apps/frontend/
├── src/
│   ├── App.jsx                # Componente principal y rutas
│   ├── main.jsx               # Punto de entrada, configura router
│   ├── index.css              # Estilos globales
│   ├── App.css                # Estilos del componente App
│   ├── assets/                # Imágenes y SVG
│   ├── components/
│   │   ├── DashboardNavbar.jsx    # Barra superior con botón para abrir/cerrar sidebar
│   │   └── DashboardSidebar.jsx   # Sidebar colapsable con iconos Tabler
│   ├── common/
│   │   └── constants.api.js   # Endpoints centralizados
│   ├── hooks/                 # (puede eliminarse si ya no se usan hooks personalizados)
│   └── pages/
│       ├── LoginPage.jsx      # Página de login (TanStack Query)
│       └── DashboardPage.jsx  # Dashboard con layout tipo Tabler, widgets y sidebar
├── public/
│   └── vite.svg               # Favicon
├── index.html                 # HTML principal
├── vite.config.js             # Configuración de Vite
├── eslint.config.js           # Configuración de ESLint
├── package.json               # Dependencias y scripts
├── .env                       # Variables de entorno (API URL)
└── README.md                  # Documentación
```

## Características del Dashboard
- Layout tipo Tabler: sidebar oscuro colapsable, navbar superior, área principal con grid de widgets.
- Sidebar con iconos Tabler y soporte para abrir/cerrar desde la navbar.
- Widgets y tarjetas de métricas usando componentes Card y Button de Tabler React.
- Integración de TanStack Query para login/logout y gestión de datos.
- Estilos globales importados desde Tabler React.
- Estructura modular y fácil de extender.

## Scripts Útiles
- `pnpm dev --filter frontend`: Inicia el frontend en modo desarrollo
- `pnpm build:frontend`: Compila el frontend
- `pnpm lint:frontend`: Ejecuta ESLint



## Estado de Integración y Funcionalidades
- Tabler React se utiliza en la página de login (`LoginPage.jsx`) y dashboard (`DashboardPage.jsx`) para el layout, botones y experiencia de usuario.
- El login está integrado con el backend: el formulario envía las credenciales al endpoint `/auth/login` y guarda el token JWT en `localStorage` tras autenticación exitosa.
- Tras login exitoso, el usuario es redirigido automáticamente al dashboard.
- El dashboard incluye un botón para cerrar sesión, que llama al endpoint `/auth/logout` y elimina el token local, redirigiendo al login.
- Login y logout gestionados con mutaciones de TanStack Query (`@tanstack/react-query`).
- Los endpoints de la API están centralizados en `src/common/constants.api.js` y la URL base se configura en `.env`.
- La navegación entre páginas se gestiona con `react-router-dom`.
- La carpeta `components` sigue vacía y no existen componentes reutilizables basados en Tabler React.
- No se han integrado aún los componentes avanzados de Tabler React (sidebar, widgets, tablas, gráficos, etc.).

## Notas
- El frontend está preparado para consumir la API del backend NestJS.
- La estructura y lógica están listas para integrar más endpoints y vistas protegidas.
- El único componente de página implementado es el login, usando algunos componentes de Tabler React.
- La integración completa del dashboard y sus componentes está pendiente.
