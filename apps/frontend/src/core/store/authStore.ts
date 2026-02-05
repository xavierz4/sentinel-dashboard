import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definir la forma del usuario (Modelo)
export interface User {
  id: number;
  email: string;
  username?: string;
  roles?: string[];
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  
  // Acciones
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) => set({ 
        token, 
        user, 
        isAuthenticated: true 
      }),

      logout: () => set({ 
        token: null, 
        user: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'auth-storage', // Nombre para localStorage
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }), // Qué persistir
    }
  )
);
