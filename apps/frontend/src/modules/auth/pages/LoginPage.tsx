import { useLoginLogic, LoginCredentials } from '@modules/auth/hooks/useAuth';
import { GenericForm } from '@shared/components';
import { validators } from '@shared/utils/validators';

export const LoginPage = () => {
  // Usamos el hook de lógica, renombrado para claridad
  const { login, isLoading, isError } = useLoginLogic();

  const handleSubmit = async (values: LoginCredentials) => {
    try {
      await login(values);
    } catch (error) {
      // El error ya es manejado internamente por isError del hook
      // Dejamos el log solo para debugging si es necesario, o lo quitamos para prod
      console.error('Error en login:', error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-boxdark-2">
      <div className="w-full max-w-125 p-4">
        <GenericForm<LoginCredentials>
          title="Panel Administrativo"
          defaultValues={{ email: '', password: '' }}
          fields={[
            {
              type: 'email',
              name: 'email',
              label: 'Email',
              placeholder: 'admin@example.com',
              validators: { onChange: validators.email() },
            },
            {
              type: 'password',
              name: 'password',
              label: 'Contraseña',
              placeholder: '••••••••',
              validators: { onChange: validators.minLength(6, 'La contraseña') },
            },
          ]}
          onSubmit={handleSubmit}
          loadingText="Entrando..."
          submitText="Iniciar Sesión"
          isLoading={isLoading}
          isError={isError}
          errorMessage="Credenciales incorrectas."
        />
      </div>
    </div>
  );
};
