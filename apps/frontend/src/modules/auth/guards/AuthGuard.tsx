import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@core/store/authStore';

export const AuthGuard = () => {
  // Consumimos el estado directamente de Zustand
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Bypass para desarrollo del dashboard
  return <Outlet />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
