/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // otras variables de entorno personalizadas aquí
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
