import { useMutation } from '@tanstack/react-query';
import { apiRequest, HttpMethod } from '@core/apiClient';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, User } from '@core/store/authStore';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

/**
 * Hook especializado para manejar la lógica de Login/Logout
 * Conecta el API con el Store Global (Zustand).
 */
export function useLoginLogic() {
  const navigate = useNavigate();
  // Usamos Zustand en lugar de Context
  const setAuth = useAuthStore((state) => state.setAuth);
  const performLogout = useAuthStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return apiRequest<AuthResponse>({
        endpoint: '/auth/login',
        options: {
          method: HttpMethod.POST,
          body: credentials
        }
      });
    },
    onSuccess: (data: AuthResponse) => {
      if (!data.access_token) {
        throw new Error('No token received');
      }
      
      // Actualizamos el Store de Zustand
      setAuth(data.access_token, data.user);
      
      navigate('/');
    },
  });

  const logout = () => {
    performLogout();
    navigate('/login');
  };

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    logout
  };
}
